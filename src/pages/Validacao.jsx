import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import Sidebar from "../components/sidebar";
import logotipoPreto from "../imagens/logotipoPreto.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Artefatos = () => {
  const homeMenus = [
    { name: "Dashboard", link: "/Dashboard", icon: MdOutlineDashboard },
    { name: "Artefatos", link: "/Artefatos", icon: FiFolder },
    { name: "Validacao", link: "/Validacao", icon: TbReportAnalytics },
    { name: "Saved", link: "/", icon: AiOutlineHeart },
    { name: "user", link: "/", icon: AiOutlineUser },
    { name: "Setting", link: "/", icon: RiSettings4Line, margin: true },
  ];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (values) => {
    if (!errors.name && !errors.password) {
      axios
        .post("http://localhost:8081/validacao", values)
        .then((res) => {
          console.log(res.data);
          if (res.data === "Sucess") {
            navigate("/Validar");
          } else {
            alert("No record existed");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#f0f0f0" }}>
      {" "}
      <Sidebar menus={homeMenus} initialOpen={false} />
      <img
        src={logotipoPreto}
        alt="Logotipo"
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ top: "15px", width: "180px", height: "auto" }}
        onClick={() => {
          window.location.href = "/Home";
        }}
      />
      <div className="p-3 rounded w-72 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 mr-2"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              placeholder="Username"
              {...register("name", {
                required: "campo de Username obrigatorio",
              })}
              className="input input-bordered"
            />
          </div>
          {errors?.name && <div>{errors.name.message}</div>}

          <div className="mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: "campo de senha obrigatorio",
              })}
              className="input input-bordered"
            />
          </div>
          {errors?.password && <div>{errors.password.message}</div>}
          <button type="submit" className="btn btn-outline btn-info w-full">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Artefatos;
