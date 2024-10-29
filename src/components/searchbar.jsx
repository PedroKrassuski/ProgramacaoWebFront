import React from "react";
import { FaUser } from "react-icons/fa";

const Teste = () => {
  return (
    <div
      div
      className="join"
      style={{
        position: "fixed",
        top: "20px",
        right: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        zIndex: 9999,
      }}
    >
      <div>
        <div>
          <input
            className="input input-bordered join-item"
            placeholder="Search"
            style={{ borderColor: "#0286a7" }}
          />
        </div>
      </div>
      <select
        className="select select-bordered join-item"
        style={{ borderColor: "#0286a7" }}
      >
        <option>Código</option>
        <option>Diagrama</option>
        <option>Arquivo</option>
      </select>
      <div className="indicator">
        <button
          className="btn join-item"
          style={{ borderColor: "#026a81", backgroundColor: "#02a5bf" }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Teste;
