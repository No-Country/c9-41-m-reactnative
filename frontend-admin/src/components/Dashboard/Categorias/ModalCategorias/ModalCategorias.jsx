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

function ModalCategorias({ categoria, setModal }) {
  const dispatch = useDispatch();

  function handleClickCerrar(e) {
    if (e.target.id === "cerrar") {
      if (
        window.confirm(
          `Cancelar ${
            categoria.nombre ? "modificación" : "creación"
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
    if (
      window.confirm(
        `Confirma ${categoria.name ? "modificar" : "crear"} categoria`
      )
    ) {
      categoria.name
        ? await dispatch(modifyCategory({ id: categoria._id, name: e.name }))
        : await dispatch(createCategory(e));
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
            categoria.nombre ? "Modificación categoria" : "Creación categoria"
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

          <Button
            type="submit"
            text={`${
              categoria.name ? "Modificar categoria" : "Crear categoria"
            }`}
          />
        </form>
        <Button
          type={null}
          text="Cancelar"
          onClick={handleClickCerrar}
          id="cerrar"
          style={s.botonCerrar}
        />
      </div>
    </div>
  );
}

export default ModalCategorias;
