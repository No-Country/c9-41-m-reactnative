import { setUsers, modifyUser, setUserDetails } from "./usersSlice";
import axios from "axios";

export function getUsers() {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url: "/admin/users",
      });
      return dispatch(setUsers(res.data.users));
    } catch (error) {
      alert("Hubo un problema al obtener los usuarios");
    }
  };
}

export function changeRole(userId, role) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PUT",
        withCredentials: true,
        data: { role },
        url: "/admin/user/" + userId,
      });
      return dispatch(modifyUser(res.data.user));
    } catch (error) {
      alert("Hubo un problema al modificar el rol de usuario");
    }
  };
}

export function recoverUser(userId) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PATCH",
        withCredentials: true,
        url: "/admin/user/" + userId,
      });
      return dispatch(modifyUser(res.data.recoveredUser));
    } catch (error) {
      alert("Hubo un problema al recuperar el usuario");
    }
  };
}

export function banUser(userId) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "DELETE",
        withCredentials: true,
        url: "/admin/user/" + userId,
      });
      return dispatch(modifyUser(res.data.bannedUser));
    } catch (error) {
      alert("Hubo un problema al banear el usuario");
    }
  };
}

export function getUserDetails(userId) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        withCredentials: true,
        url: "/admin/user/" + userId,
      });
      console.log(data);
      return dispatch(setUserDetails(data.userDetails));
    } catch (error) {
      alert("Hubo un problema al obtener los datos de usuario");
    }
  };
}
