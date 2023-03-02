import sLogin from "../../../Login/Login.module.css";
import s from "./ModalProducto.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputFormulario from "../../../../ui/InputFormulario/InputFormulario";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ImagenModificar from "./Imagenes/ImagenModificar/ImagenModificar";
import { modifyProduct } from "../../../../redux/slices/productSlice/productThunk";

export default function ModalProducto({
  producto,
  setMostrarModal,
  categorias,
}) {
  const dispatch = useDispatch();
  const [imagenes, setImagenes] = useState([
    producto?.images[0] || {},
    producto?.images[1] || {},
    producto?.images[2] || {},
    producto?.images[3] || {},
    producto?.images[4] || {},
  ]);

  const imagenesIniciales = [
    producto.images[0] || false,
    producto.images[1] || false,
    producto.images[2] || false,
    producto.images[3] || false,
    producto.images[4] || false,
  ];

  const [imagenesABorrar, setImagenesABorrar] = useState([]);

  const [nombreImagenes, setNombreImagenes] = useState([
    producto.images[0]?.url,
    producto.images[1]?.url,
    producto.images[2]?.url,
    producto.images[3]?.url,
    producto.images[4]?.url,
  ]);

  const [cambioImagen, setCambioImagen] = useState(Array(5).fill(false));

  const [modificandoProducto, setModificandoProducto] = useState(false);

  const initialValues = {
    name: producto.name,
    price: producto.price,
    categories: producto.categories,
    description: producto.description,
    stock: producto.stock,
    onSale: producto.onSale,
    discount: producto.discount || 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(20, "*El nombre debe tener máximo 20 carácteres")
      .required("*Campo requerido"),
    price: Yup.number()
      .positive("*El precio debe ser positivo")
      .min(1, "*El precio debe ser positivo")
      .max(
        10000000,
        "*Precio maximo $10.000.000, si deseas puedes contactar con soporte para mayor limite"
      )
      .required("*Campo requerido"),
    categories: Yup.array()
      .of(Yup.string())
      .min(1, "*Seleccionar al menos 1 categoria")
      .required("*Campo requerido"),
    description: Yup.string()
      .max(150, "*La descripción debe tener máximo 150 carácteres")
      .required("*Campo requerido"),
    stock: Yup.number()
      .positive("*Minimo debes vender 1 unidad")
      .min(1, "*Minimo debes vender 1 unidad")
      .required("*Campo requerido"),
    onSale: Yup.bool().required("*Campo requerido"),
    discount: Yup.number().when("onSale", {
      is: (onSale) => onSale,
      then: (discount) =>
        discount
          .min(1, "*El descuento debe ser minimo 1%")
          .max(99, "*El descuento no debe ser mayor a 99%")
          .required(
            "*Si seleccionas 'En Oferta' debes indicar el % de descuento, ej: 25"
          ),
    }),
  });

  async function onSubmit(e) {
    setModificandoProducto(true);
    const formData = new FormData();

    imagenes.forEach((i) => {
      if (i instanceof Blob) {
        formData.append("images", i);
      }
    });

    formData.append("name", e.name);
    formData.append("stock", e.stock);
    formData.append("categories", e.categories);
    formData.append("description", e.description);
    formData.append("price", e.price);
    formData.append("id", producto._id);
    formData.append("onSale", e.onSale);
    formData.append("discount", e.discount);

    imagenesABorrar.length &&
      formData.append("imagesToDelete", imagenesABorrar);

    try {
      await dispatch(modifyProduct(formData));
      alert("Producto modificado correctamente!");
      resetForm();
      setMostrarModal(false);
    } catch (e) {
      alert("Hubo un error.. Puedes intentar nuevamente!");
    }
    setModificandoProducto(false);
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

  function handleBotonCerrar(e) {
    if (e.target.id === "botonCerrar" || e.target.id === "fondoModal") {
      if (window.confirm("Seguro deseas cancelar la modificación?")) {
        resetForm();
        setMostrarModal(false);
      }
    }
  }

  return (
    <div
      onClick={handleBotonCerrar}
      id="fondoModal"
      className={s.contenedorModal}
    >
      <form
        className={s.contenedorForm}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1 className={s.titulo}>Modificando producto...</h1>

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

        <InputFormulario
          placeholder="Entre $0,01 y $100.000.000"
          tipo="number"
          name="price"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          estiloError={touched.price && errors.price && true}
          mostrarError={touched.price && errors.price && true}
          msjError={errors.price}
          estilos={s.inputFormCrear}
          id={"price"}
          label={"Precio"}
        />

        <label
          className={`${s.textareaLabelCrear} ${s.inputFormCrear} ${
            touched.description && errors.description && s.error
          }`}
          htmlFor="description"
        >
          Descripción
        </label>
        <textarea
          id="description"
          placeholder="Máximo 150 caracteres"
          name="description"
          rows={5}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${s.input} ${
            touched.description && errors.description && s.error
          } ${s.textareaCrear}`}
        />
        {touched.description && errors.description && (
          <p className={`${s.msjError} ${s.error}`}>{errors.description}</p>
        )}

        <InputFormulario
          placeholder="Minimo 1 unidad"
          tipo="number"
          name="stock"
          value={values.stock}
          onChange={handleChange}
          onBlur={handleBlur}
          estiloError={touched.stock && errors.stock && true}
          mostrarError={touched.stock && errors.stock && true}
          msjError={errors.stock}
          estilos={s.inputFormCrear}
          id={"stock"}
          label={"Stock"}
        />

        <div className={s.renglonSelects}>
          <div
            className={`${s.contenedorSelect} ${s.inputFormCrear} ${s.inputsRenglon}`}
          >
            <label
              className={touched.onSale && errors.onSale && s.errorSelect}
              htmlFor="onSale"
            >
              En oferta
            </label>
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.onSale}
              className={`${s.inputSelect} ${
                touched.onSale && errors.onSale && s.errorSelect
              }`}
              name={"onSale"}
              id={"onSale"}
            >
              <option value={true}>En oferta</option>
              <option value={false}>Sin oferta</option>
            </select>
            {touched.onSale && errors.onSale && (
              <div className={`${s.msjErrorSelect} ${s.errorSelect}`}>
                {errors.onSale}
              </div>
            )}
          </div>

          <InputFormulario
            placeholder="Minimo 1"
            tipo="number"
            name="discount"
            value={values.discount}
            onChange={handleChange}
            onBlur={handleBlur}
            estiloError={touched.discount && errors.discount && true}
            mostrarError={touched.discount && errors.discount && true}
            msjError={errors.discount}
            estilos={s.inputFormCrear}
            id="discount"
            label={"% descuento"}
          />
        </div>

        <div
          className={`${s.contenedorSelect} ${s.inputFormCrear} ${s.inputsRenglon}`}
        >
          <label
            className={touched.categories && errors.categories && s.errorSelect}
            htmlFor="categories"
          >
            Categorias
          </label>
          <select
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.categories}
            className={`${s.inputSelect} ${
              touched.categories && errors.categories && s.errorSelect
            } ${s.inputSelectCategories}`}
            name="categories"
            id="categories"
            multiple={true}
          >
            <option value="" disabled={true}>
              Puedes seleccionar mas de una opción manteniendo presionando
              ctrl/cmd
            </option>
            {categorias?.map((i, idx) => {
              return (
                <option key={idx} value={i._id}>
                  {i.name}
                </option>
              );
            })}
          </select>
          {touched.categories && errors.categories && (
            <div className={`${s.msjErrorSelect} ${s.errorSelect}`}>
              {errors.categories}
            </div>
          )}
        </div>

        <div className={s.contenedorImagenes}>
          <p className={s.textoImagenes}>Seleccionar imagenes</p>
          <div className={s.imagenes}>
            <ImagenModificar
              key={"imagenModificar1"}
              imagen={imagenes[0]}
              setImagenes={setImagenes}
              nombreImagenes={nombreImagenes}
              setNombreImagenes={setNombreImagenes}
              indexImg={0}
              setCambioImagen={setCambioImagen}
              cambioImagen={cambioImagen}
              imagenesIniciales={imagenesIniciales}
              setImagenesABorrar={setImagenesABorrar}
            />

            <ImagenModificar
              key={"imagenModificar2"}
              imagen={imagenes[1]}
              setImagenes={setImagenes}
              nombreImagenes={nombreImagenes}
              setNombreImagenes={setNombreImagenes}
              indexImg={1}
              setCambioImagen={setCambioImagen}
              cambioImagen={cambioImagen}
              imagenesIniciales={imagenesIniciales}
              setImagenesABorrar={setImagenesABorrar}
            />

            <ImagenModificar
              key={"imagenModificar3"}
              imagen={imagenes[2]}
              setImagenes={setImagenes}
              nombreImagenes={nombreImagenes}
              setNombreImagenes={setNombreImagenes}
              indexImg={2}
              setCambioImagen={setCambioImagen}
              cambioImagen={cambioImagen}
              imagenesIniciales={imagenesIniciales}
              setImagenesABorrar={setImagenesABorrar}
            />

            <ImagenModificar
              key={"imagenModificar4"}
              imagen={imagenes[3]}
              setImagenes={setImagenes}
              nombreImagenes={nombreImagenes}
              setNombreImagenes={setNombreImagenes}
              indexImg={3}
              setCambioImagen={setCambioImagen}
              cambioImagen={cambioImagen}
              imagenesIniciales={imagenesIniciales}
              setImagenesABorrar={setImagenesABorrar}
            />

            <ImagenModificar
              key={"imagenModificar5"}
              imagen={imagenes[4]}
              setImagenes={setImagenes}
              nombreImagenes={nombreImagenes}
              setNombreImagenes={setNombreImagenes}
              indexImg={4}
              setCambioImagen={setCambioImagen}
              cambioImagen={cambioImagen}
              imagenesIniciales={imagenesIniciales}
              setImagenesABorrar={setImagenesABorrar}
            />
          </div>
        </div>
        <button
          className={`${sLogin.boton} ${sLogin.botonIngresar}`}
          type="submit"
        >
          {!modificandoProducto ? "Modificar" : <ClipLoader />}
        </button>
        <button
          id="botonCerrar"
          type="button"
          className={`${sLogin.boton} ${s.botonCerrar} `}
          // onClick={handleBotonCerrar}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
