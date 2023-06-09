import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import NextNProgress from "nextjs-progressbar";
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../styles/login.css'
import '../styles/adminblog.css'
import '../styles/admin.css'
var jwt = require('jsonwebtoken');


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState({ value: null })
  const [updatekey, setKey] = useState(0)
  const [token, settoken] = useState({ value: null })

  const logout = async () => {
    const logouttoken = localStorage.getItem('token')
    if (logouttoken) {
        localStorage.removeItem('token')
        setUser({ value: null })
        settoken({ value: null })
        setKey(Math.random())
        router.push("/")
    }
  }


  useEffect(() => {
    const cdtoken = localStorage.getItem('token')
    if (cdtoken) {
      const ctoken = JSON.parse(cdtoken).token

      if (ctoken) {
        settoken({ value: ctoken })
        setUser({ value: ctoken })
        setKey(Math.random())
      }
    }

  }, [router.query])

  return <>
    <NextNProgress
      options={{ showSpinner: false }}
    />
    
    <Navbar user={user} adminuser={{ user }} key={updatekey} logout={logout} />
    <div className="home-section">
      <Component {...pageProps} logout={logout} token={token} />
    </div>
  </>
}

export default MyApp
