import { Form, message } from "antd";
import React from "react";
import "../resourses/auth.css";
import "../resourses/global.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { HideLoading, ShowLoading } from "../redux/alertsSlice";

const Register = () => {
  // const dispatch = useDispatch();
  const navigate=useNavigate()
  const onFinish = async (values) => {
    try {
      // dispatch(ShowLoading());
      const response = await axios.post("/api/users/register", values);
      // dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login")
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      // dispatch(HideLoading());
      message.error(error.message);
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
