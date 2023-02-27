import axios from "axios";
import { setSales, setSaleDetails } from "./salesSlice";

export function getSales() {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url: "/admin/sales",
      });
      return dispatch(setSales(res.data.sales));
    } catch (error) {
      alert("Hubo un problema al obtener las ventas");
    }
  };
}

export function getSaleDetails(saleId) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url: "/admin/sales/" + saleId,
      });
      return dispatch(setSaleDetails(res.data.sale));
    } catch (error) {
      alert("Hubo un problema al obtener el detalle de la venta");
    }
  };
}
