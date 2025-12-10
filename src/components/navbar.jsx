import React from 'react'
import { Link } from 'react-router-dom'



const Navbar = () => {
  return (
    <div className="relative z-50">
      <nav className="bg-gradient-to-l from-black/60 via-purple-700/50 to-purple-500/40 p-4 m-5 rounded-full">

        <div className="flex justify-between items-center">
          <div className="logo">

            <ul>
              <li className='font-bold'>
                {/* split WHISPER into per-letter spans so we can animate letters individually */}
                <span className="text-4xl whisper whisper--play">
                  {'WHISPER'.split('').map((ch, i) => (
                    <span
                      key={i}
                      className="whisper-letter inline-block"
                      style={{ ['--i']: i }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>

                <span className='text-white text-2xl ml-2'>BOX</span>
              </li>
            </ul>
          </div>

          <div className="info">
            <ul className="flex space-x-6 text-white">
              <li className="relative group cursor-pointer">
                <Link to="/">Home</Link>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </li>
              <li className="relative group cursor-pointer">
                 <Link to="/about">About</Link>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </li>
              <li className="relative group cursor-pointer">
                <Link to="/contact">Contact</Link>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
