import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import wallpaper from "../imagens/Wallpaper.jpg";
import "../css/signup.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log("ola");
    if (!errors.companyName && !errors.email && !errors.password) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/");
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
        <h1 className="text-center">Sign-Up</h1>
        <p />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="companyName">
              <strong>Nome Empresa</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Company Name"
              {...register("companyName", {
                required: "campo de Nome da Empresa obrigatorio",
              })}
              className="form-control rounded-0"
            />
            {errors?.companyName && <div>{errors.companyName.message}</div>}
          </div>
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
            <strong>Sign up</strong>
          </button>
          <p />
          <Link
            to="/"
            className="btn btn-default border w-100 bg-light roudend-0 text-decoration-none"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
