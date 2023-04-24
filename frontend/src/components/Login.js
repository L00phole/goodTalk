import React from 'react'
// eslint-disable-next-line
import { useState, UseEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'


function Login() {
  const [formData, setFormData] = useState({
    
    email: '',
    password: '',
 
  })

  const {   email, password  } = formData
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
// eslint-disable-next-line
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <section className="flex place-content-center ">
      <div className="p-3  items-center  pb-8">
          <h1 className="flex items-center font-medium"><FaSignInAlt />Login</h1>
          <p> Login to start Chatting</p>
        </div>
      </section>
      <section className="place-content-center grid ">
        <form onSubmit={onSubmit} >
           
            
           <div className="p-2">
            <input type="email" className="form-control place-content-center px-2 rounded-md border-2 border-slate-600" id="email" name='email' value={email} placeholder="Enter email" onChange={onChange} />
          </div>
           <div className="p-2">
            <input type="password" className="form-control place-content-center px-2 rounded-md border-2 border-slate-600" id="password" name='password' value={password} placeholder="Enter password" onChange={onChange} />
          </div>
          
          <div className="rounded bg-cyan-200 border-2 border-slate-600/50 justify-center flex mt-2 mx-2 py-1 bg-black hover:bg-slate-700">
            <button type='submit' className="text-white font-bold ">
submit
            </button>
           </div>
          <Link to='/register' className='flex items-center justify-center m-2 hover:text-blue-600 underline'>
             <p className='pl-1'>Or register here</p>
              
          </Link>
          
         
        </form>

      </section>
    </>
  )
}


export default Login