import s from "./ModalCategorias.module.css";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputFormulario from "../../../../ui/InputFormulario/InputFormulario";
import Button from "../../../../ui/Button/Button";
import {
  createCategory,
  modifyCategory,
} from "../../../../redux/slices/productSlice/productThunk";
import ImagenCrearCategoria from "./ImagenCrearCategoria/ImagenCrearCategoria";
import ImagenModificarCategoria from "./ImagenModificarCategoria/ImagenModificarCategoria";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

function ModalCategorias({ categoria, setModal }) {
  const dispatch = useDispatch();
  const [cargando, setCargando] = useState(false);

  const [imagen, setImagen] = useState(categoria.image ? categoria.image : {});

  const [nombreImagen, setNombreImagen] = useState(
    categoria.image?.url ? categoria.image?.url : ""
  );
  const [imagenABorrar, setImagenABorrar] = useState("");

  function handleClickCerrar(e) {
    if (e.target.id === "cerrar" || e.target.id === "botonCerrar") {
      if (
        window.confirm(
          `Cancelar ${
            categoria.name ? "modificación" : "creación"
          } de categoria?`
        )
      ) {
        setModal(false);
      }
    }
  }

  const initialValues = {
    name: categoria.name || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*Nombre requerido"),
  });

  async function onSubmit(e) {
    if (cargando) return;
    if (
      window.confirm(
        `Confirma ${categoria.name ? "modificar" : "crear"} categoria`
      )
    ) {
      const formData = new FormData();
      formData.append("name", e.name);
      if (imagen instanceof Blob) formData.append("image", imagen);
      setCargando(true);
      if (categoria.name) {
        formData.append("id", categoria._id);
        if (imagenABorrar.length)
          formData.append("imageToDelete", imagenABorrar);
        await dispatch(modifyCategory(formData));
      } else {
        await dispatch(createCategory(formData));
      }
      setCargando(false);
      alert(`Categoria ${categoria.name ? "modificada" : "creada"}`);
      setModal(false);
    }
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    handleBlur,
    resetForm,
  } = formik;

  return (
    <div className={s.contenedor} id="cerrar" onClick={handleClickCerrar}>
      <div className={s.contenedorForm}>
        <form onSubmit={handleSubmit}>
          <div className={s.tituloCategoria}>{`${
            categoria.name ? "Modificación categoria" : "Creación categoria"
          }`}</div>
          <InputFormulario
            placeholder="Máximo 20 carácteres"
            tipo="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            estiloError={touched.name && errors.name && true}
            mostrarError={touched.name && errors.name && true}
            msjError={errors.name}
            estilos={s.inputFormCrear}
            id={"name"}
            label={"Nombre"}
          />
          <div className={s.contenedorImagen}>
            <div>Seleccionar imagen</div>
            {categoria.name ? (
              <ImagenModificarCategoria
                imagen={imagen}
                setImagen={setImagen}
                nombreImagen={nombreImagen}
                setNombreImagen={setNombreImagen}
                setImagenABorrar={setImagenABorrar}
              />
            ) : (
              <ImagenCrearCategoria
                imagen={imagen}
                setImagen={setImagen}
                nombreImagen={nombreImagen}
                setNombreImagen={setNombreImagen}
              />
            )}
          </div>

          <Button
            type="submit"
            text={
              cargando ? (
                <ClipLoader />
              ) : (
                `${categoria.name ? "Modificar categoria" : "Crear categoria"}`
              )
            }
          />
        </form>
        <Button
          type="button"
          text="Cancelar"
          onClick={handleClickCerrar}
          id="botonCerrar"
          style={s.boton}
        />
      </div>
    </div>
  );
}

export default ModalCategorias;
