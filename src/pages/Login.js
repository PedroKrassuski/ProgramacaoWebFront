import React, { useState } from "react";
import "../css/login.css";
import wallpaper from "../imagens/Wallpaper.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (values) => {
    if (!errors.email && !errors.password) {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data === "Sucess") {
            navigate("/home");
          } else {
            alert("No record existed");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bf-primary vh-100"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-3 rounded w-25">
        <h5 className="text-center">Log in</h5>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: "campo de email obrigatorio" })}
              className="form-control rounded-0"
            />
            {errors?.email && <div>{errors.email.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: "campo de senha obrigatorio",
              })}
              className="form-control rounded-0"
            />
            {errors?.password && <div>{errors.password.message}</div>}
          </div>
          <button type="submit" className="btn-login">
            <strong>Log in</strong>
          </button>
          <p />
          <Link
            to="/Signup"
            className="btn btn-default border w-100 bg-light roudend-0 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
