import React from 'react'
// eslint-disable-next-line
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {DiYii} from 'react-icons/di'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="p-4 font-bold border-b border-cyan-200/80 shadow-md ">
     <div className="flex items-center justify-between ">
      <div className='justify-start flex'><DiYii/>GoodTalk
      </div>
      
      <ul className=' flex '>
        <li className='px-2'>
          <Link to='/login' className='flex items-center'>
            <FaSignInAlt/><p className='pl-1'>Login</p> 
          </Link>
        </li>
        <li className='px-2'>
          <Link to='/register' className='flex items-center '>
              <FaUser /> <p className='pl-1'>Register</p>
              
          </Link>
        </li>
        </ul>
      </div>
    </header>
  )
}

export default Header