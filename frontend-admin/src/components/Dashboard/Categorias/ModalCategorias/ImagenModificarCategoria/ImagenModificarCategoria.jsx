import s from "./ImagenModificarCategoria.module.css";
import { AiFillCloseCircle } from "react-icons/ai";

export default function ImagenModificarCategoria({
  imagen,
  setImagen,
  nombreImagen,
  setNombreImagen,
  setImagenABorrar,
}) {
  function onChangeImagen(e) {
    if (e.target.files[0].type.split("/")[0] !== "image") {
      alert("El archivo debe ser una imagen");
      return;
    }
    if (e.target.files[0].size > 2097152) {
      alert("La imagen es muy grande.");
      return;
    }
    setImagen(e.target.files[0]);
    setNombreImagen(URL.createObjectURL(e.target.files[0]));
  }

  function handlerEliminarImagen() {
    if (window.confirm("Seguro desea eliminar la imagen?")) {
      if (!(imagen instanceof Blob)) setImagenABorrar(imagen.name);
      setImagen({});
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
          <img src={nombreImagen} alt={`imagen`} className={s.imagen} />
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
