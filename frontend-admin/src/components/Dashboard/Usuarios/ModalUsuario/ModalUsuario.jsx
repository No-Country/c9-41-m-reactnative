import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { setUserDetails } from "../../../../redux/slices/usersSlice/usersSlice";
import { getUserDetails } from "../../../../redux/slices/usersSlice/usersThunk";
import Button from "../../../../ui/Button/Button";
import s from "./ModalUsuario.module.css";

function ModalUsuario({ detalleUsuario, setDetalleUsuario }) {
  const dispatch = useDispatch();
  const [cargando, setCargando] = useState(false);

  const { userDetails } = useSelector((e) => e.users);

  useEffect(() => {
    (async () => {
      setCargando(true);
      await dispatch(getUserDetails(detalleUsuario));
      setCargando(false);
    })();

    return () => {
      dispatch(setUserDetails({}));
    };
  }, []);

  return (
    <div className={s.contenedor}>
      {cargando ? (
        <ClipLoader color="white" />
      ) : (
        <div className={s.fondo}>
          <div className={s.titulo}>Detalles de usuario</div>
          <div className={s.detalles}>
            <div className={s.detalle}>Email: {userDetails?.email}</div>
            <div className={s.detalle}>
              Activo: {userDetails?.active ? "Activo" : "Inactivo"}
            </div>
            <div className={s.detalle}>Rol: {userDetails?.role}</div>
            <div className={s.detalle}>
              Verificado: {userDetails?.verified ? "Si" : "No"}
            </div>
            <div className={s.detalle}>Creado en: {userDetails?.createdIn}</div>
            <div className={s.detalle}>Creado el: {userDetails?.createdAt}</div>
            <div className={s.detalle}>
              Ultima modificación: {userDetails?.updatedAt}
            </div>
          </div>

          <div className={s.subTitulo}>Direcciones</div>
          <table className={s.table}>
            <thead>
              <tr className={s.trHeadTable}>
                <th>Calle</th>
                <th>Numero</th>
                <th>Ciudad</th>
                <th>Provincia</th>
                <th>C.P.</th>
                <th>Detalles</th>
                <th>Contacto</th>
              </tr>
            </thead>
            <tbody>
              {userDetails?.addresses?.map((i, idx) => {
                return (
                  <tr key={idx} className={s.trBodyTable}>
                    <td>{i.street}</td>
                    <td>{i.number}</td>
                    <td>{i.city}</td>
                    <td>{i.province}</td>
                    <td>{i.zipCode}</td>
                    <td>{i.detail}</td>
                    <td>{i.contact}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={s.subTitulo}>Ordenes</div>
          <table className={s.table}>
            <thead>
              <tr className={s.trHeadTable}>
                <th>Id orden</th>
                <th>Total</th>
                <th>Envío</th>
                <th>Medio pago</th>
                <th>Estado pago</th>
                <th>Estado envío</th>
                <th>Cantidad productos</th>
              </tr>
            </thead>
            <tbody>
              {userDetails?.orders?.map((i, idx) => {
                return (
                  <tr key={idx} className={s.trBodyTable}>
                    <td>{i._id}</td>
                    <td>{i.total}</td>
                    <td>{i.shippingMethod}</td>
                    <td>{i.paymentMethod}</td>
                    <td>{i.paymentStatus}</td>
                    <td>{i.shippingStatus}</td>
                    <td>{i.orderItems}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Button
            text="Cerrar"
            onClick={() => setDetalleUsuario(false)}
            style={s.boton}
          />
        </div>
      )}
    </div>
  );
}

export default ModalUsuario;
