import s from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputFormulario from "../../ui/InputFormulario/InputFormulario";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../redux/slices/userSlice/userThunk";
import Button from "../../ui/Button/Button";

let emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  async function onSubmit(e) {
    setLoading(true);
    await dispatch(loginUser(e));
    setLoading(false);
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test("is-email", "*Ingresa un e-mail valido", (val) => {
        if (val !== undefined) {
          return emailValidator.test(val);
        }
        return true;
      })
      .required("*Campo requerido"),

    password: Yup.string().required("*Campo obligatorio"),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleChange, handleSubmit, errors, values, touched, handleBlur } =
    formik;

  return (
    <div className={s.contenedor}>
      <form className={s.contenedorForm} onSubmit={handleSubmit}>
        <div className={s.inputLogin}>
          <InputFormulario
            label="Email"
            placeholder="Inserta tu email"
            tipo="email"
            onChange={handleChange}
            value={values.username}
            estiloError={touched.username && errors.username && true}
            name="username"
            id="username"
            mostrarError={touched.username && errors.username && true}
            msjError={errors.username}
            onBlur={handleBlur}
            // estilos={s.inputLogin}
            // estilosLabel={}
          />
        </div>
        <div className={s.inputLogin}>
          <InputFormulario
            label="Contraseña"
            placeholder="Inserta tu contraseña"
            tipo="password"
            onChange={handleChange}
            value={values.password}
            estiloError={touched.password && errors.password && true}
            name="password"
            id="password"
            mostrarError={touched.password && errors.password && true}
            msjError={errors.password}
            onBlur={handleBlur}
            // estilos={}
            // estilosLabel={}
          />
        </div>
        {!loading ? (
          <Button type="submit" text="Iniciar Sesión" />
        ) : (
          <div cflassName={s.loadingBotonLogin}>
            <ClipLoader />
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
