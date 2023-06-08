import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const NewAccount = () => {
  const router = useRouter()

  useEffect(() => {
    const checkuser = JSON.parse(localStorage.getItem('token'))
    if (!checkuser) {
      router.push('/admin/login')
    }
  })
  return (
    <div>NewAccount</div>
  )
}

export default NewAccount