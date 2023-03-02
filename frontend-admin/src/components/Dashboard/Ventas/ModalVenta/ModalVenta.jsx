import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSaleDetails } from "../../../../redux/slices/salesSlice/salesSlice";
import { getSaleDetails } from "../../../../redux/slices/salesSlice/salesThunk";
import { ClipLoader } from "react-spinners";

import s from "./ModalVenta.module.css";

function ModalVenta({ venta, setVenta }) {
  const dispatch = useDispatch();
  const { saleDetails } = useSelector((e) => e.sales);
  const [cargandoProducto, setCargandoProducto] = useState(false);

  useEffect(() => {
    (async () => {
      setCargandoProducto(true);
      await dispatch(getSaleDetails(venta._id));
      setCargandoProducto(false);
    })();

    return () => {
      dispatch(setSaleDetails({}));
    };
  }, []);

  return (
    <div className={s.contenedor}>
      <div className={s.contenedorDetalles}>
        <div className={s.detalle}>
          <b> Id venta:</b> {venta._id}
        </div>
        <div className={s.detalle}>
          <b> Id usuario:</b> {venta.userId._id}
        </div>
        <div className={s.detalle}>
          <b> Total:</b> ${venta.total}
        </div>
        <div className={s.detalle}>
          <b> Metodo envío:</b> {venta.shippingMethod}
        </div>
        <div className={s.detalle}>
          <b> Estado envío:</b> {venta.shippingStatus}
        </div>
        <div className={s.detalle}>
          <b> Metodo pago:</b> {venta.paymentMethod}
        </div>
        <div className={s.detalle}>
          <b> Estado pago:</b> {venta.paymentStatus}
        </div>
        <div className={s.detalle}>
          <b> Dirección envío: </b> {venta.shippingAddress}
        </div>
      </div>
      <div className={s.tituloTabla}>Productos del pedido:</div>
      {cargandoProducto ? (
        <ClipLoader />
      ) : (
        <table className={s.table}>
          <thead>
            <tr className={s.trHeadTable}>
              <th></th>
            </tr>
          </thead>
          {/* <tbody>
          {saleDetails.orderItems.map((i) => {
            return (
              <tr key={idx} className={s.trBodyTable}>
                <td></td>
              </tr>
            );
          })}
        </tbody> */}
        </table>
      )}
    </div>
  );
}

export default ModalVenta;
