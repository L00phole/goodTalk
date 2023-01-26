import React from 'react'
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'


function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const { firstName, lastName, email, password, passwordConfirm } = formData
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      throw new Error('password do not match')
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
      }
     

    }
  }
  return (
    <>
      <section className="flex place-content-center ">
      <div className="p-3  items-center justify-between pb-8">
          <h1 className="flex items-center font-medium"><FaUser />REGISTER</h1>
          <p>Please create a new account</p>
        </div>
      </section>
      <section className="place-content-center grid ">
        <form  >
          <div className="p-2">
            <input type="text" className="form-control place-content-center px-2 rounded-md border-2 border-slate-600" id="firstName" name='firstName' value={firstName} placeholder="Enter firstname" onChange={onChange} />
          </div>
           <div className="p-2">
            <input type="text" className="form-control place-content-center px-2 rounded-md border-2 border-slate-600" id="lastName" name='lastName' value={lastName} placeholder="Enter lastname" onChange={onChange} />
          </div>
           <div className="p-2">
            <input type="email" className="form-control place-content-center px-2 rounded-md border-2 border-slate-600" id="email" name='email' value={email} placeholder="Enter email" onChange={onChange} />
          </div>
           <div className="p-2">
            <input type="password" className="form-control place-content-center px-2 rounded-md border-2 border-slate-600" id="password" name='password' value={password} placeholder="Enter password" onChange={onChange} />
          </div>
          <div className="p-2">
            <input type="password" className="form-control place-content-center px-2 rounded-md border-2 border-slate-600" id="passwordConfirm" name='passwordConfirm' value={passwordConfirm} placeholder="Confirm password " onChange={onChange} />
          </div>
          <div className="rounded bg-cyan-200 border-2 border-slate-600/50 justify-center flex mt-2 mx-2 py-1 bg-black">
            <button type='submit' className="text-white font-bold">
submit
            </button>
           </div>
          
          
         
        </form>

      </section>
    </>
  )
}

export default Register