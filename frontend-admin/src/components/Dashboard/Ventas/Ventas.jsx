import { useEffect, useState } from "react";
import s from "../Productos/Productos.module.css";
import { useSelector, useDispatch } from "react-redux";
import { BarLoader } from "react-spinners";
import ModalVenta from "./ModalVenta/ModalVenta";
import { getSales } from "../../../redux/slices/salesSlice/salesThunk";
import { setSales } from "../../../redux/slices/salesSlice/salesSlice";

function Ventas() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [venta, setVenta] = useState(false);
  const { sales } = useSelector((e) => e.sales);

  function handleDetalles(venta) {
    setVenta(venta);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getSales());
      setLoading(false);
    })();

    return () => {
      dispatch(setSales([]));
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
              <th>Id venta</th>
              <th>Usuario</th>
              <th>Total</th>
              <th>Metodo envío</th>
              <th>Estado envío</th>
              <th>Estado pago</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((i, idx) => {
              return (
                <tr key={idx} className={s.trBodyTable}>
                  <td>{i._id}</td>
                  <td>{i.userId.email}</td>
                  <td>$ {i.total}</td>
                  <td>{i.shippingMethod}</td>
                  <td>{i.shippingStatus}</td>
                  <td>{i.paymentStatus}</td>
                  <td onClick={() => handleDetalles(i)} className={s.cursor}>
                    D
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {venta ? <ModalVenta venta={venta} setVenta={setVenta} /> : null}
    </div>
  );
}

export default Ventas;
