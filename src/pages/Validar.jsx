import React, { useState, useEffect } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import Sidebar from "../components/sidebar";
import logotipoPreto from "../imagens/logotipoPreto.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { format } from "date-fns";

const Validar = () => {
  const homeMenus = [
    { name: "Dashboard", link: "/Dashboard", icon: MdOutlineDashboard },
    { name: "Artefatos", link: "/Artefatos", icon: FiFolder },
    { name: "Validacao", link: "/Validacao", icon: TbReportAnalytics },
    { name: "Saved", link: "/", icon: AiOutlineHeart },
    { name: "user", link: "/", icon: AiOutlineUser },
    { name: "Setting", link: "/", icon: RiSettings4Line, margin: true },
  ];
  const [artefato, setArtefato] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/validarArtefatos")
      .then((res) => {
        setArtefato(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAprovar = (id) => {
    axios
      .put(`http://localhost:8081/aprovarArtefato/${id}`)
      .then((res) => {
        // Atualizar o estado artefato após a aprovação
        setArtefato((prevArtefato) =>
          prevArtefato.map((item) =>
            item.id === id ? { ...item, validacao: "Aprovado" } : item
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRecusar = (id) => {
    axios
      .put(`http://localhost:8081/recusarArtefato/${id}`)
      .then((res) => {
        // Atualizar o estado artefato após a recusa
        setArtefato((prevArtefato) =>
          prevArtefato.map((item) =>
            item.id === id ? { ...item, validacao: "Recusado" } : item
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex  h-screen">
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

      <div
        className="flex flex-col flex-grow items-start"
        style={{ marginTop: "100px", width: "100vw", height: "80vh" }}
      >
        <div
          className="flex-grow w-3/4 bg-white rounded"
          style={{
            marginTop: "50px",
            width: "calc(100% - 200px)",
            height: "auto",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          <div className="flex flex-wrap justify-center">
            {artefato.length === 0 ? (
              <div role="alert" className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Nenhum Artefato de Software a ser validado.</span>
              </div>
            ) : (
              artefato.map((data, i) => (
                <div key={i} className="card-wrapper">
                  <div className="card w-80 bg-white shadow-md rounded-lg overflow-hidden mx-4 my-4">
                    <div className="p-4 flex flex-col justify-between h-full">
                      <div className="flex items-center mb-4">
                        <span
                          className="indicator-item badge badge-secondary"
                          style={{
                            backgroundColor: "#01ccff",
                            border: "1px solid #01ccff",
                          }}
                        >
                          {data.id}
                        </span>
                        <h2 className="text-lg font-semibold mb-0 ml-2">
                          {data.nome}
                        </h2>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Descrição Detalhada:</strong>{" "}
                        {data.descricaoDetalhada}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Tipo de Reuso:</strong> {data.tipoReuso}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Data de Publicação:</strong>{" "}
                        {format(new Date(data.dataPublicacao), "dd/MM/yyyy")}
                      </p>
                      <div className="flex justify-center">
                        <button
                          className="btn btn-outline btn-success mr-2"
                          onClick={() => {
                            handleAprovar(data.id);
                            window.location.reload();
                          }}
                        >
                          Aprovar
                        </button>
                        <button
                          className="btn btn-outline btn-error"
                          onClick={() => {
                            handleRecusar(data.id);
                            window.location.reload();
                          }}
                        >
                          Recusar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validar;
