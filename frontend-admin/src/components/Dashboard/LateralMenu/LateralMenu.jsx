import s from "./LateralMenu.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/slices/userSlice/userThunk";

function LateralMenu({ menuAbierto, setMenuAbierto }) {
  const dispatch = useDispatch();

  function handleSelectMenu(e) {
    let cerrar = {
      productos: false,
      categorias: false,
      crearProducto: false,
      productosEliminados: false,
      ventas: false,
      usuarios: false,
    };
    setMenuAbierto(() => {
      cerrar[e.target.id] = true;
      return cerrar;
    });
  }

  function handleCerrarSesion() {
    if (window.confirm("Deseas cerrar sesión?")) {
      dispatch(logoutUser());
    }
  }

  return (
    <div className={s.contenedor}>
      <ul className={s.listadoLateralMenu}>
        <li onClick={handleCerrarSesion} style={{ color: "red" }}>
          Cerrar sesión
        </li>
        <li
          id="productos"
          onClick={handleSelectMenu}
          className={menuAbierto.productos ? s.menuSeleccionado : null}
        >
          Productos
        </li>
        <li
          id="categorias"
          onClick={handleSelectMenu}
          className={menuAbierto.categorias ? s.menuSeleccionado : null}
        >
          Categorias
        </li>
        <li
          id="crearProducto"
          onClick={handleSelectMenu}
          className={menuAbierto.crearProducto ? s.menuSeleccionado : null}
        >
          Crear Producto
        </li>
        <li
          id="productosEliminados"
          onClick={handleSelectMenu}
          className={
            menuAbierto.productosEliminados ? s.menuSeleccionado : null
          }
        >
          Productos Eliminados
        </li>
        <li
          id="ventas"
          onClick={handleSelectMenu}
          className={menuAbierto.ventas ? s.menuSeleccionado : null}
        >
          Ventas
        </li>
        <li
          id="usuarios"
          onClick={handleSelectMenu}
          className={menuAbierto.usuarios ? s.menuSeleccionado : null}
        >
          Usuarios
        </li>
      </ul>
    </div>
  );
}

export default LateralMenu;
