import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../redux/slices/productSlice/productSlice";
import {
  deleteCategory,
  getCategories,
} from "../../../redux/slices/productSlice/productThunk";
import s from "./Categorias.module.css";
import { BarLoader } from "react-spinners";
import ModalCategorias from "./ModalCategorias/ModalCategorias";
import Button from "../../../ui/Button/Button";

function Categorias() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const { categories } = useSelector((e) => e.products);

  function handleDeleteCategory(cateogryId) {
    if (window.confirm("Seguro desea eliminar la categoria?")) {
      dispatch(deleteCategory(cateogryId));
    }
  }

  function handleAbrirModal(cat, accion) {
    accion === "abrir" ? setModal({}) : setModal(cat);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getCategories());
      setLoading(false);
    })();

    return () => {
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
        <>
          <Button
            type={null}
            text="Crear categoria"
            style={s.botonCrear}
            onClick={() => {
              handleAbrirModal({}, "crear");
            }}
          />
          <table className={s.table}>
            <thead>
              <tr className={s.trHeadTable}>
                <th>Id cateogoria</th>
                <th>Nombre</th>
                <th>Eliminar</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {categories.length
                ? categories.map((i) => {
                    return (
                      <tr key={i.name} className={s.trBodyTable}>
                        <td>{i._id}</td>
                        <td>{i.name}</td>
                        <td
                          className={s.cursor}
                          onClick={() => handleDeleteCategory(i._id)}
                        >
                          E
                        </td>
                        <td
                          className={s.cursor}
                          onClick={() => handleAbrirModal(i, "modificar")}
                        >
                          M
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </>
      )}
      {modal ? <ModalCategorias categoria={modal} setModal={setModal} /> : null}
    </div>
  );
}

export default Categorias;
