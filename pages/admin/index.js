import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

const Dashboard = ({ logout }) => {
  const router = useRouter()

  useEffect(() => {
    const checkuser = JSON.parse(localStorage.getItem('token'))
    if (!checkuser) {
      router.push('/admin/login')
    }
  }, [])
  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="admin-container">
        <Link href={'/admin/blogs'}><button className='admin-button'>Blogs</button></Link>
        <Link href={'/admin/blog/addblog'}><button className='admin-button'>Add New Blog</button></Link>
        <button onClick={logout} className='admin-button'>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard
