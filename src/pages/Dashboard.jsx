import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { CgAlignLeft } from "react-icons/cg";
import "../css/dashboard.css";
import Sidebar from "../components/sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";

import logotipoPreto from "../imagens/logotipoPreto.png";

const Artefatos = () => {
  const taxaReuso = [
    {
      name: "Downloads",
      total: 15,
      downloads: 8,
      amt: 20,
    },
  ];

  const qtdDownloads = [
    {
      name: "Tipo 1",
      total: 15,
      downloads: 8,
    },
    {
      name: "Tipo 2",
      total: 15,
      downloads: 3,
    },
    {
      name: "Tipo 3",
      total: 15,
      downloads: 4,
    },
  ];

  const homeMenus = [
    { name: "Dashboard", link: "/Dashboard", icon: MdOutlineDashboard },
    { name: "Artefatos", link: "/Artefatos", icon: FiFolder },
    { name: "Validacao", link: "/Validacao", icon: TbReportAnalytics },
    { name: "Saved", link: "/", icon: AiOutlineHeart },
    { name: "user", link: "/", icon: AiOutlineUser },
    { name: "Setting", link: "/", icon: RiSettings4Line, margin: true },
  ];

  return (
    <div className="flex w-screen h-screen">
      <img
        src={logotipoPreto}
        alt="Logotipo"
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ top: "15px", width: "180px", height: "auto" }}
        onClick={() => {
          window.location.href = "/Home";
        }}
      />
      <Sidebar menus={homeMenus} initialOpen={false} />
      <main className="main-container">
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <CgAlignLeft className="icon" />
              <h3>Quantidade de Downloads</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={qtdDownloads}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="downloads"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="total" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <div className="card-inner">
              <CgAlignLeft className="icon" />
              <h3>Taxa de Reuso</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={taxaReuso}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="downloads"
                  fill="#8884d8"
                  shape={<Rectangle fill="#8884d8" stroke="blue" />}
                />
                <Bar
                  dataKey="total"
                  fill="#82ca9d"
                  shape={<Rectangle fill="#82ca9d" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Artefatos;
