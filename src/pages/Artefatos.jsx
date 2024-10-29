import React, { useEffect, useState, useRef } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import Sidebar from "../components/sidebar";
import logotipoPreto from "../imagens/logotipoPreto.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

const Artefatos = () => {
  const homeMenus = [
    { name: "Dashboard", link: "/Dashboard", icon: MdOutlineDashboard },
    { name: "Artefatos", link: "/Artefatos", icon: FiFolder },
    { name: "Validacao", link: "/Validar", icon: TbReportAnalytics },
    // { name: "Saved", link: "/", icon: AiOutlineHeart },
    // { name: "user", link: "/", icon: AiOutlineUser },
    // { name: "Setting", link: "/", icon: RiSettings4Line, margin: true },
  ];

  const [artefato, setArtefato] = useState([]);
  const refModal = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:8081/consultarArtefatos")
      .then((res) => {
        setArtefato(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    if (
      !errors.nome &&
      !errors.descricaoBreve &&
      !errors.descricaoDetalhada &&
      !errors.tipoReuso
    ) {
      axios
        .post("http://localhost:8081/cadastroArtefato", values)
        .then((res) => {
          window.location.reload();
          refModal.current.click();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <Sidebar menus={homeMenus} initialOpen={false} />
      <div className="flex flex-col flex-1">
        <img
          src={logotipoPreto}
          alt="Logotipo"
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ top: "15px", width: "180px", height: "auto" }}
          onClick={() => {
            window.location.href = "/Home";
          }}
        />
        <div className="my-4 sm:my-2">
          <button
            className="btn btn-outline btn-info"
            onClick={() => {
              document.getElementById("my_modal_3").showModal();
            }}
          >
            Cadastrar Artefato
          </button>
        </div>

        <div className="flex flex-col items-center">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    ref={refModal}
                  >
                    X
                  </button>
                </form>
                <h3 className="font-bold text-lg">Informações</h3>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Nome</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Nome do artefato"
                    {...register("nome", {
                      required: "Campo de Nome obrigatório",
                    })}
                    className="input input-bordered input-info w-full"
                  />
                  {errors?.nome && <div>{errors.nome.message}</div>}

                  <div className="label">
                    <span className="label-text">Descrição Breve</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Breve descrição do artefato"
                    {...register("descricaoBreve", {
                      required: "Campo de Descrição Breve obrigatório",
                    })}
                    className="input input-bordered input-info w-full"
                  />
                  {errors?.descricaoBreve && (
                    <div>{errors.descricaoBreve.message}</div>
                  )}
                  <div className="label">
                    <span className="label-text">Descrição Detalhada</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Descrição detalhada do artefato"
                    {...register("descricaoDetalhada", {
                      required: "Campo de Descrição Detalhada obrigatório",
                    })}
                    className="input input-bordered input-info w-full"
                  />
                  {errors?.descricaoDetalhada && (
                    <div>{errors.descricaoDetalhada.message}</div>
                  )}

                  <select
                    className="select select-info select-bordered w-full"
                    style={{ marginTop: "15px" }}
                    {...register("tipoReuso", {
                      required: "Campo de Tipo de Reuso obrigatório",
                    })}
                  >
                    <option value="" disabled selected>
                      Tipo de Reuso
                    </option>
                    <option value="Incremental">Incremental</option>
                    <option value="Iterativo">Iterativo</option>
                    <option value="Proativo">Proativo</option>
                  </select>
                  {errors?.tipoReuso && <div>{errors.tipoReuso.message}</div>}
                  <div className="label">
                    <span className="label-text">Versão</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Versão do artefato"
                    {...register("versao", {
                      required: "Campo de versão obrigatório",
                    })}
                    className="input input-bordered input-info w-full"
                  />
                  {errors?.versao && <div>{errors.versao.message}</div>}

                  <button
                    type="submit"
                    className="btn btn-outline btn-success w-full"
                    style={{ marginTop: "15px" }}
                  >
                    Publicar
                  </button>
                </label>
              </div>
            </dialog>
          </form>

          <div
            className="flex-grow w-full bg-white rounded mt-4"
            style={{ marginLeft: "15px", marginRight: "20px" }}
          >
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Descrição Breve</th>
                  <th>Tipo de Reuso</th>
                  <th>Data de Publicação</th>
                  <th>Versão</th>
                  <th>Downloads</th>
                  <th>Validação</th>
                </tr>
              </thead>
              <tbody>
                {artefato.map((data, i) => (
                  <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.nome}</td>
                    <td>{data.descricaoBreve}</td>
                    <td>{data.tipoReuso}</td>
                    <td>
                      {format(new Date(data.dataPublicacao), "dd/MM/yyyy")}
                    </td>
                    <td>{data.versao}</td>
                    <td>{data.downloads}</td>
                    <td>{data.validacao}</td>
                    <td>
                      <button className="btn btn-outline btn-success">
                        Editar
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-outline btn-error">
                        Apagar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artefatos;
