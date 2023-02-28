import { setUser } from "./userSlice";
import axios from "axios";

export function loginUser(user) {
  return async (dispatch, getState) => {
    try {
      const res = await axios({
        method: "POST",
        data: user,
        withCredentials: true,
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Content-Type": "application/json",
        // },
        url: "/auth/signin",
      });
      if (
        res.data.user.role === "superadmin" ||
        res.data.user.role === "admin"
      ) {
        dispatch(setUser(res.data.user));
      } else {
        alert("Usuario no autorizado");
      }
    } catch (error) {
      alert("Problemas al iniciar sesión, intentelo nuevamente");
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      await axios({
        method: "POST",
        withCredentials: true,
        url: "/auth/logout",
      });
      dispatch(setUser({}));
    } catch (error) {
      alert("Error al cerrar sesión, intentelo nuevamente");
    }
  };
}

export function refreshUser() {
  return async (dispatch) => {
    try {
      const usuario = await axios({
        method: "GET",
        withCredentials: true,
        url: "/auth/perfil",
      });
      dispatch(setUser(usuario.data.user));
    } catch (error) {
      console.log("error", error);
    }
  };
}
