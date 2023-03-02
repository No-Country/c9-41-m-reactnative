import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setProducts,
} from "../../../redux/slices/productSlice/productSlice";
import {
  deleteProduct,
  getCategories,
  getProducts,
} from "../../../redux/slices/productSlice/productThunk";
import s from "./Productos.module.css";
import { BarLoader } from "react-spinners";
import ModalProducto from "./ModalProducto/ModalProducto";

function Productos({}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const { categories } = useSelector((e) => e.products);

  const { products } = useSelector((e) => e.products);

 async function handleDeleteProduct(productId) {
    if (window.confirm("Seguro desea eliminar el producto?")) {
      setLoading(true);
      await dispatch(deleteProduct(productId));
      setLoading(false);
    }
  }

  function handleModificarProduct(product) {
    setModal(product);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getProducts());
      await dispatch(getCategories());
      setLoading(false);
    })();

    return () => {
      dispatch(setProducts([]));
      dispatch(setCategories([]));
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
              <th>Stock</th>
              <th>En oferta</th>
              <th>Ventas</th>
              <th>Eliminar</th>
              <th>Modificar</th>
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
                      <td>{i.stock}</td>
                      <td>{i.onSale ? "si" : "no"}</td>
                      <td>{i.sales}</td>
                      <td
                        className={s.cursor}
                        onClick={() => handleDeleteProduct(i._id)}
                      >
                        E
                      </td>
                      <td
                        className={s.cursor}
                        onClick={() => handleModificarProduct(i)}
                      >
                        M
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      )}
      {modal ? (
        <ModalProducto
          producto={modal}
          setMostrarModal={setModal}
          categorias={categories}
        />
      ) : null}
    </div>
  );
}

export default Productos;
