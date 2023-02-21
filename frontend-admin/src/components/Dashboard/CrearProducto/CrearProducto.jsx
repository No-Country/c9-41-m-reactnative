import React from "react";
import s from "./CrearProducto.module.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";

import ClipLoader from "react-spinners/ClipLoader";

import InputFormulario from "../../../ui/InputFormulario/InputFormulario";
import Button from "../../../ui/Button/Button";

import ImagenesVender from "./ImagenesVender/ImagenesVender";

import { useEffect } from "react";
import {
  createProduct,
  getCategories,
} from "../../../redux/slices/productSlice/productThunk";
import { setCategories } from "../../../redux/slices/productSlice/productSlice";

let verificarDosNumerosDespuesDeLaComa = /^\d+(\.\d{0,2})?$/;

function validarImg(nombreImagenes, imagenes) {
  for (let i = 0; i < nombreImagenes.length; i++) {
    if (nombreImagenes[i].length) {
      if (
        imagenes[i].name.split(".").reverse()[0] !== "png" &&
        imagenes[i].name.split(".").reverse()[0] !== "jpg" &&
        imagenes[i].name.split(".").reverse()[0] !== "jpeg"
      ) {
        throw new Error(
          `Imagen ${i + 1} no soportada (solo .png - .jpg - .jpeg)`
        );
      }
    }
  }
}

function CrearProducto({}) {
  const dispatch = useDispatch();
  const categorias = useSelector((e) => e.products.categories);
  const nombresCategorias = categorias?.map((i) => {
    return i.name;
  });

  const [imagen1, setImagen1] = useState("");
  const [imagen2, setImagen2] = useState("");
  const [imagen3, setImagen3] = useState("");
  const [imagen4, setImagen4] = useState("");
  const [imagen5, setImagen5] = useState("");
  const [nombreImagenes, setNombreImagenes] = useState(Array(5).fill(""));

  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    price: "",
    description: "",
    stock: "",
    onSale: "",
    discount: 0,
    categories: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(20, "*El nombre debe tener máximo 20 carácteres")
      .required("*Campo requerido"),
    price: Yup.number()
      .positive("*El precio debe ser positivo")
      .min(0.01, "*Precio minimo $ 0,01")
      .test("is-decimal", "*Maximo dos decimales ej: 9.99", (val) => {
        if (val != undefined) {
          return verificarDosNumerosDespuesDeLaComa.test(val);
        }
        return true;
      })
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
    categories: Yup.array()
      .of(Yup.string())
      .min(1, "*Seleccionar al menos 1 categoria")
      .required("*Campo requerido"),
  });

  async function onSubmit(e) {
    setLoading(true);
    const formData = new FormData();
    try {
      validarImg(nombreImagenes, [imagen1, imagen2, imagen3, imagen4, imagen5]);
    } catch (error) {
      alert(error);
      setLoading(false);
      return;
    }
    nombreImagenes[0].length && formData.append("images", imagen1);
    nombreImagenes[1].length && formData.append("images", imagen2);
    nombreImagenes[2].length && formData.append("images", imagen3);
    nombreImagenes[3].length && formData.append("images", imagen4);
    nombreImagenes[4].length && formData.append("images", imagen5);
    formData.append("name", e.name);
    formData.append("price", e.price);
    formData.append("description", e.description);
    formData.append("stock", e.stock);
    formData.append("onSale", e.onSale);
    formData.append("discount", e.discount);
    formData.append("categories", e.categories);
    try {
      await dispatch(createProduct(formData));
      alert("Producto creado!");
      resetForm();
      setNombreImagenes(Array(5).fill(""));
      setImagen1("");
      setImagen2("");
      setImagen3("");
      setImagen4("");
      setImagen5("");
    } catch (e) {
      alert("Hubo un error.. Puedes intentar nuevamente");
    }
    setLoading(false);
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

  useEffect(() => {
    (async () => {
      await dispatch(getCategories());
    })();

    return () => {
      dispatch(setCategories([]));
    };
  }, []);

  return (
    <div className={s.contenedorCrearProducto}>
      <form
        className={s.formularioCrearProducto}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
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
          className={`${s.textareaLabelCrear} ${
            touched.description && errors.description && s.error
          }`}
          htmlFor="descripcion"
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
              <option value="" disabled={values.onSale.length ? true : false}>
                Selecciona una opción
              </option>
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

        <ImagenesVender
          imagen1={imagen1}
          imagen2={imagen2}
          imagen3={imagen3}
          imagen4={imagen4}
          imagen5={imagen5}
          nombreImagenes={nombreImagenes}
          setImagen1={setImagen1}
          setImagen2={setImagen2}
          setImagen3={setImagen3}
          setImagen4={setImagen4}
          setImagen5={setImagen5}
          setNombreImagenes={setNombreImagenes}
        />

        {!loading ? (
          <Button type="submit" text="Crear producto" />
        ) : (
          <ClipLoader />
        )}
      </form>
    </div>
  );
}

export default CrearProducto;
