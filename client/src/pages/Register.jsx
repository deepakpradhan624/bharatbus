import { Form } from 'antd'
import React from 'react'
import "../resourses/auth.css"
import "../resourses/global.css"
import { Link } from 'react-router-dom'


const Register = () => {
  return (
    <>
    <div className='h-screen mt-5 d-flex justify-content-center align-item-center'>
       
        <div className='w-400 card' >
        <h1 className='register-text mb-4'> Register</h1>
<hr />
        <Form layout='vertical'>
           <Form.Item label="Name"> 
                <input type="text" />
           </Form.Item>
           <Form.Item label="Email"> 
                <input type="email" />
           </Form.Item>
           <Form.Item label="Password"> 
                <input type="password" />
           </Form.Item>
        </Form>

         <div className="d-flex justify-content-between align-items-center">

<Link to="/login">Click Here to Login</Link>
<button className="secondary-btn">
    Register
</button>

         </div>
        </div>
        
        
    </div>
    </>
  )
}

export default Register