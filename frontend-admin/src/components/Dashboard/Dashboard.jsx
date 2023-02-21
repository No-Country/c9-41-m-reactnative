import { useState } from "react";
import Categorias from "./Categorias/Categorias";
import CrearProducto from "./CrearProducto/CrearProducto";
import s from "./Dashboard.module.css";
import LateralMenu from "./LateralMenu/LateralMenu";
import Productos from "./Productos/Productos";
import ProductosEliminados from "./ProductosEliminados/ProductosEliminados";

function Dashboard({ user }) {
  const [menuAbierto, setMenuAbierto] = useState({
    productos: true,
    categorias: false,
    crearProducto: false,
    productosEliminados: false,
    ventas: false,
    usuarios: false,
  });
  return (
    <div className={s.contenedor}>
      <LateralMenu menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} />
      {menuAbierto.productos ? <Productos /> : null}
      {menuAbierto.categorias ? <Categorias /> : null}
      {menuAbierto.crearProducto ? <CrearProducto /> : null}
      {menuAbierto.productosEliminados ? <ProductosEliminados /> : null}
    </div>
  );
}

export default Dashboard;
