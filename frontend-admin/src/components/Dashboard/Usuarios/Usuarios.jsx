import { useEffect, useState } from "react";
import s from "../Productos/Productos.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  changeRole,
  recoverUser,
  banUser,
} from "../../../redux/slices/usersSlice/usersThunk";
import { BarLoader, PulseLoader } from "react-spinners";
import { setUsers } from "../../../redux/slices/usersSlice/usersSlice";
import ModalUsuario from "./ModalUsuario/ModalUsuario";

function Usuarios() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingRol, setLoadingRol] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [detalleUsuario, setDetalleUsuario] = useState(false);

  const { users } = useSelector((e) => e.users);

  async function handleChangeRole(e, userId) {
    if (window.confirm("Cambiar rol de usuario?")) {
      setLoadingRol(true);
      await dispatch(changeRole(userId, e.target.value));
      setLoadingRol(false);
    }
  }

  async function handleChangeActive(e, user) {
    if (user.role !== "user") {
      alert("No se puede banear un usuario administrador");
      e.target.value = "true";
      return;
    }
    if (window.confirm("Cambiar estado de usuario?")) {
      if (e.target.value === "true") {
        setLoadingActive(true);
        await dispatch(recoverUser(user._id));
        setLoadingActive(false);
      } else {
        setLoadingActive(true);
        await dispatch(banUser(user._id));
        setLoadingActive(false);
      }
    } else {
      if (e.target.value === "true") {
        e.target.value = "false";
      } else {
        e.target.value = "true";
      }
    }
  }

  function handleDetalles(user) {
    setDetalleUsuario(user);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getUsers());
      setLoading(false);
    })();

    return () => {
      dispatch(setUsers([]));
    };
  }, []);

  return (
    <div className={s.contenedor}>
      {loading ? (
        <div className={s.loading}>
          <BarLoader />
        </div>
      ) : (
        <table className={s.table}>
          <thead>
            <tr className={s.trHeadTable}>
              <th>Id usuario</th>
              <th>E-mail</th>
              <th>Activo</th>
              <th>Verificado</th>
              <th>Rol</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((i, idx) => {
              return (
                <tr key={idx} className={s.trBodyTable}>
                  <td>{i._id}</td>
                  <td>{i.email}</td>
                  <td>
                    {i.role === "superadmin" ? (
                      "SI"
                    ) : loadingActive ? (
                      <PulseLoader size={5} />
                    ) : (
                      <select
                        name="active"
                        id="active"
                        defaultValue={i.active ? "true" : "false"}
                        onChange={(e) => handleChangeActive(e, i)}
                      >
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    )}
                  </td>
                  <td>{i.verified ? "Si" : "No"}</td>
                  <td>
                    {i.role === "superadmin" ? (
                      "superadmin"
                    ) : loadingRol ? (
                      <PulseLoader size={5} />
                    ) : (
                      <select
                        name="rol"
                        id="rol"
                        defaultValue={i.role}
                        onChange={(e) => handleChangeRole(e, i._id)}
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    )}
                  </td>
                  <td
                    onClick={() => handleDetalles(i._id)}
                    className={s.cursor}
                  >
                    D
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {detalleUsuario ? (
        <ModalUsuario
          detalleUsuario={detalleUsuario}
          setDetalleUsuario={setDetalleUsuario}
        />
      ) : null}
    </div>
  );
}

export default Usuarios;
