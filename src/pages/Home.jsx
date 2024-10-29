import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/searchbar";
import logotipoPreto from "../imagens/logotipoPreto.png";

const Home = () => {
  const homeMenus = [
    { name: "Dashboard", link: "/Dashboard", icon: MdOutlineDashboard },
    { name: "Artefatos", link: "/Artefatos", icon: FiFolder },
    { name: "Validacao", link: "/Validacao", icon: TbReportAnalytics },
    { name: "Saved", link: "/", icon: AiOutlineHeart },
    { name: "user", link: "/", icon: AiOutlineUser },
    { name: "Setting", link: "/", icon: RiSettings4Line, margin: true },
  ];

  return (
    <div className="flex w-screen min-h-screen">
      <img
        src={logotipoPreto}
        alt="Logotipo"
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ top: "15px", width: "180px", height: "auto" }}
      />
      <div className="sidebar bg-base-200">
        <Sidebar menus={homeMenus} initialOpen={true} />
      </div>
      {/* <SearchBar /> */}
      <div className="hero min-h-screen bg-base-200 flex items-center justify-center">
        <div className="hero-content text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-5xl font-bold">Conheça o ReUse</h1>
            <p className="py-6">
              Uma plataforma que permite a padronização de artefatos de software
              em uma empresa, fornecendo relatórios a partir dos artefatos
              publicados.
            </p>
            <button className="btn btn-outline btn-info">Conhecer</button>
          </div>
        </div>
        <style jsx>{`
          .hero-content {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;
