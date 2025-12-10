const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Create tables if they don't exist
const createTables = () => {
  db.query(`
  CREATE TABLE IF NOT EXISTS forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id VARCHAR(10) UNIQUE,
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `, (err) => {
    if (err) console.error("Error creating forms table:", err);
  });

  db.query(`
  CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id VARCHAR(10),
    question_id BIGINT,
    question_text TEXT,
    question_type VARCHAR(50),
    question_required BOOLEAN DEFAULT FALSE,
    question_options JSON,
    FOREIGN KEY (form_id) REFERENCES forms(form_id)
  );
  `, (err) => {
    if (err) console.error("Error creating questions table:", err);
  });

  db.query(`
  CREATE TABLE IF NOT EXISTS responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id VARCHAR(10),
    response_set_id VARCHAR(50),
    question_id BIGINT,
    answer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES forms(form_id)
  );
  `, (err) => {
    if (err) console.error("Error creating responses table:", err);
  });
};

// Initialize tables after a short delay
setTimeout(createTables, 1000);

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// CREATE FORM
app.post("/forms", (req, res) => {
  const { form_id, title, description, questions } = req.body;

  const sql = "INSERT INTO forms (form_id, title, description) VALUES (?, ?, ?)";

  db.query(sql, [form_id, title, description], (err) => {
    if (err) return res.json({ error: err.message });

    // Insert questions
    questions.forEach(q => {
      db.query(
        "INSERT INTO questions (form_id, question_id, question_text, question_type, question_required, question_options) VALUES (?, ?, ?, ?, ?, ?)",
        [form_id, q.id, q.text, q.type, q.required, JSON.stringify(q.options || [])]
      );
    });

    res.json({ message: "Form created", form_id });
  });
});

// GET ALL FORMS
app.get("/forms", (req, res) => {
  db.query("SELECT * FROM forms ORDER BY created_at DESC", (err, forms) => {
    if (err) {
      console.error("Error fetching forms:", err);
      return res.status(500).json({ error: err.message });
    }
    
    // Get full form details with questions
    const formsWithQuestions = [];
    let processed = 0;

    if (!forms || forms.length === 0) {
      return res.json([]);
    }

    forms.forEach(form => {
      db.query(
        "SELECT * FROM questions WHERE form_id = ? ORDER BY id ASC",
        [form.form_id],
        (err, questions) => {
          if (err) {
            console.error("Error fetching questions for form:", err);
            questions = [];
          }
          
          const formWithQuestions = {
            ...form,
            questions: (questions || []).map(q => ({
              id: q.question_id,
              text: q.question_text,
              type: q.question_type,
              required: q.question_required,
              options: JSON.parse(q.question_options || '[]')
            }))
          };
          formsWithQuestions.push(formWithQuestions);

          processed++;
          if (processed === forms.length) {
            res.json(formsWithQuestions);
          }
        }
      );
    });
  });
});

// GET SINGLE FORM BY ID
app.get("/forms/:form_id", (req, res) => {
  const form_id = req.params.form_id;

  db.query("SELECT * FROM forms WHERE form_id = ?", [form_id], (err, forms) => {
    if (err) return res.status(500).json({ error: err.message });
    if (forms.length === 0) return res.status(404).json({ error: "Form not found" });

    db.query(
      "SELECT * FROM questions WHERE form_id = ? ORDER BY id ASC",
      [form_id],
      (err, questions) => {
        if (err) return res.status(500).json({ error: err.message });
        
        res.json({
          ...forms[0],
          questions: questions.map(q => ({
            id: q.question_id,
            text: q.question_text,
            type: q.question_type,
            required: q.question_required,
            options: JSON.parse(q.question_options || '[]')
          }))
        });
      }
    );
  });
});

// SUBMIT FORM RESPONSES
app.post("/forms/:form_id/responses", (req, res) => {
  const form_id = req.params.form_id;
  const { answers } = req.body;
  const response_set_id = `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Get questions to match answer format
  db.query(
    "SELECT * FROM questions WHERE form_id = ?",
    [form_id],
    (err, questions) => {
      if (err) return res.status(500).json({ error: err.message });

      let inserted = 0;
      
      if (Object.keys(answers).length === 0) {
        return res.json({ message: "Responses saved", response_set_id });
      }

      Object.entries(answers).forEach(([questionId, answer]) => {
        db.query(
          "INSERT INTO responses (form_id, response_set_id, question_id, answer) VALUES (?, ?, ?, ?)",
          [form_id, response_set_id, questionId, Array.isArray(answer) ? answer.join(", ") : answer],
          (err) => {
            if (err) console.error(err);
            inserted++;
            if (inserted === Object.keys(answers).length) {
              res.json({ message: "Responses saved", response_set_id });
            }
          }
        );
      });
    }
  );
});

// GET FORM RESPONSES
app.get("/forms/:form_id/responses", (req, res) => {
  const form_id = req.params.form_id;

  db.query(
    "SELECT DISTINCT response_set_id FROM responses WHERE form_id = ? ORDER BY created_at DESC",
    [form_id],
    (err, responseSets) => {
      if (err) return res.status(500).json({ error: err.message });

      if (responseSets.length === 0) {
        return res.json([]);
      }

      const allResponses = [];
      let processed = 0;

      responseSets.forEach(rs => {
        db.query(
          "SELECT * FROM responses WHERE form_id = ? AND response_set_id = ? ORDER BY question_id ASC",
          [form_id, rs.response_set_id],
          (err, responses) => {
            if (err) {
              console.error(err);
            } else {
              const answersObj = {};
              responses.forEach(r => {
                answersObj[r.question_id] = r.answer;
              });
              allResponses.push({
                response_set_id: rs.response_set_id,
                answers: answersObj,
                created_at: responses[0]?.created_at || new Date()
              });
            }

            processed++;
            if (processed === responseSets.length) {
              res.json(allResponses);
            }
          }
        );
      });
    }
  );
});

// UPDATE FORM
app.put("/forms/:form_id", (req, res) => {
  const form_id = req.params.form_id;
  const { title, description, questions } = req.body;

  db.query(
    "UPDATE forms SET title = ?, description = ? WHERE form_id = ?",
    [title, description, form_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Delete old questions
      db.query("DELETE FROM questions WHERE form_id = ?", [form_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        // Insert new questions
        let inserted = 0;
        if (questions.length === 0) {
          return res.json({ message: "Form updated", form_id });
        }

        questions.forEach(q => {
          db.query(
            "INSERT INTO questions (form_id, question_id, question_text, question_type, question_required, question_options) VALUES (?, ?, ?, ?, ?, ?)",
            [form_id, q.id, q.text, q.type, q.required, JSON.stringify(q.options || [])],
            (err) => {
              if (err) console.error(err);
              inserted++;
              if (inserted === questions.length) {
                res.json({ message: "Form updated", form_id });
              }
            }
          );
        });
      });
    }
  );
});

// DELETE FORM
app.delete("/forms/:form_id", (req, res) => {
  const form_id = req.params.form_id;

  // Delete responses first
  db.query("DELETE FROM responses WHERE form_id = ?", [form_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Delete questions
    db.query("DELETE FROM questions WHERE form_id = ?", [form_id], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Delete form
      db.query("DELETE FROM forms WHERE form_id = ?", [form_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Form deleted", form_id });
      });
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
