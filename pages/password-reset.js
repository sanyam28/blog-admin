import React, { useState } from 'react'
import { useRouter } from 'next/router'
import connectDb from '../middleware/mongoose';
import resetpassword from '../models/resetpassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import User from '../models/User';

const PasswordReset = ({ usertoken, userid }) => {
  const router = useRouter();
  const token = router.query["token"];

  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')

  const handleChange = (e) => {
    if (e.target.name == 'password') {
      setpassword(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setconfirmpassword(e.target.value)
    }
  }

  const resetformsubmit = async (e) => {
    e.preventDefault()
    const data = {password, usertoken, userid}
    let res = await fetch(`/api/user/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    if (response.success) {
      toast.success(response.success, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(`/admin/login`)
      }, 1000);
    }
    else {
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
      <ToastContainer />
      PasswordReset token : <p>{token}</p>
      <form>
        <div className='reset-field'>
          <label htmlFor="password">
            Choose new password
          </label>
          <input type="text" value={password} name='password' onChange={handleChange} />
        </div>
        <div className='reset-field'>
          <label htmlFor="cpassword">
            Confirm your new password
          </label>
          <input type="text" value={confirmpassword} name='cpassword' onChange={handleChange} />
        </div>
      </form>
      <button disabled={password !=confirmpassword || password == ''} type='submit' onClick={resetformsubmit}>Change Password</button>
    </div>
  )
}

export default PasswordReset

export async function getServerSideProps(context) {
  await connectDb();
  const usertoken = context.query["token"]

  let passwordreset = await resetpassword.findOne({ reset_token: usertoken });
  let usersession = JSON.parse(JSON.stringify(passwordreset))

  if (!usersession) {
    return {
      notFound: true,
    }
  }
  const userid = usersession.userid

  return {
    props: { usertoken, userid }
  }
}