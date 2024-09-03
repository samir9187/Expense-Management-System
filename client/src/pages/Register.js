import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/register`,
        values
      );
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Username or Password is wrong");
    }
  };

  // Prevent login for an already logged-in user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-page">
      {loading && <Spinner />}
      <Form
        className="register-form"
        layout="vertical"
        onFinish={submitHandler}
      >
        <h2>Register Form</h2>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input type="password" />
        </Form.Item>
        <div className="d-flex justify-content-between">
          <Link to="/login">Already Registered? Login here!</Link>
          <button className="btn">Register</button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
