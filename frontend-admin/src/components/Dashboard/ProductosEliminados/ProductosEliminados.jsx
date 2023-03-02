import s from "./ProductosEliminados.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  recoveryProduct,
  getDeletedProducts,
} from "../../../redux/slices/productSlice/productThunk";
import { BarLoader } from "react-spinners";
import Button from "../../../ui/Button/Button";
import { setProducts } from "../../../redux/slices/productSlice/productSlice";

function ProductosEliminados() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const { products } = useSelector((e) => e.products);

  async function handleRecuperar(productId) {
    if (window.confirm("Seguro desea recuperar el producto?")) {
      setLoading(true);
      await dispatch(recoveryProduct(productId));
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getDeletedProducts());
      setLoading(false);
    })();

    return () => {
      dispatch(setProducts([]));
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
              <th>Id producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Recuperar</th>
            </tr>
          </thead>
          <tbody>
            {products.length
              ? products.map((i) => {
                  return (
                    <tr key={i.name} className={s.trBodyTable}>
                      <td>{i._id}</td>
                      <td>{i.name}</td>
                      <td>{i.price}</td>
                      <td
                        className={s.cursor}
                        onClick={() => handleRecuperar(i._id)}
                      >
                        R
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      )}
      {/* {modal ? <ModalCategorias categoria={modal} setModal={setModal} /> : null} */}
    </div>
  );
}

export default ProductosEliminados;
