import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e)=>{
    if(e.target.name == 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name == 'password'){
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {email, password}
    let res = await fetch(`/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    setEmail('')
    setPassword('')
    if(response.success){
      localStorage.setItem('token', JSON.stringify({email:response.email, token: response.token, username: response.username}))
      toast.success('Succesfully logged in', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(`/admin`)
      }, 1000);
    }
    else{
      toast.error(response.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div>
      <Head>
        <title>Admin Login</title>
      </Head>
      <ToastContainer />
      <div className="login-container">
        <div className="login">
          <div className='login-form'>
          <h1>SB - Admin</h1>
          <form onSubmit={handleSubmit} id="loginform" method='POST'>
            <div className="form-field">
              <label htmlFor="email">Email Id</label>
              <input value={email} onChange={handleChange} type="email" name='email' id='email' required />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={handleChange} type="password" name='password' id='password' required />
            </div>
            <div className="form-field">
              <button className='loginsubmit' type='submit'>Login</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login