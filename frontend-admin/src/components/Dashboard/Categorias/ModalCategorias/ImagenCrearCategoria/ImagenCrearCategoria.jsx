import React from "react";
import s from "./ImagenCrearCategoria.module.css";
import { AiFillCloseCircle } from "react-icons/ai";

export default function ImagenCrearCategoria({
  imagen,
  setImagen,
  nombreImagen,
  setNombreImagen,
}) {
  function onChangeImagen(e) {
    if (e.target.files[0].type.split("/")[0] !== "image") {
      alert("El archivo debe ser una imagen");
    }
    if (e.target.files[0].size > 2097152) {
      alert("La imagen es muy grande, maximo 2mb");
    }
    setImagen(e.target.files[0]);
    setNombreImagen(URL.createObjectURL(e.target.files[0]));
  }

  function handlerEliminarImagen() {
    if (window.confirm("Seguro desea eliminar la imagen?")) {
      setImagen("");
      setNombreImagen("");
    }
  }

  return (
    <div className={s.contenedor}>
      {!nombreImagen.length ? (
        <>
          <label htmlFor="imagen" className={s.labelImagen}>
            +
          </label>
          <input
            accept="image/*"
            onChange={onChangeImagen}
            className={s.inputImagen}
            type="file"
            id="imagen"
            multiple={false}
            max={4}
          />
        </>
      ) : (
        <>
          <img
            src={nombreImagen}
            alt={`imagen seleccionada`}
            className={s.imagen}
          />
          <AiFillCloseCircle
            size={20}
            className={s.xImagen}
            onClick={handlerEliminarImagen}
          />
        </>
      )}
    </div>
  );
}
