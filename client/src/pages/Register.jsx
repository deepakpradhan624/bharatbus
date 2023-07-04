import { Form, message } from "antd";
import React from "react";
import "../resourses/auth.css";
import "../resourses/global.css";
import { Link } from "react-router-dom";
import axios from "axios"


const Register = () => {
  const onFinish = async(values) => {
    try{
 const response=await axios.post("/api/users/register",values);
 if(response.data.success){
  message.success(response.data.message)
 }else{
  message.error(response.data.message)
 }
    }
    catch(error){
message.error(error.message)
    }
  };
  return (
    <>
      <div className="h-screen mt-5 d-flex justify-content-center align-item-center">
        <div className="w-400 card">
          <h1 className="register-text mb-4"> Register</h1>
          <hr />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <input type="text" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Click Here to Login</Link>
              <button className="secondary-btn" type="submit">
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
