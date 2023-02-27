import axios from "axios";
import {
  setProducts,
  setNewProduct,
  setDeleteProduct,
  setModifyProduct,
  setCategories,
  setNewCategory,
  setModifyCategory,
  setDeleteCategory,
} from "./productSlice";

// ---------- PRODUCTOS ----------
export function getProducts() {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url: "/products",
      });
      return dispatch(setProducts(res.data.products));
    } catch (error) {
      alert("Hubo un problema al obtener los productos");
    }
  };
}

export function getDeletedProducts() {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url: "/products/deleted",
      });
      return dispatch(setProducts(res.data.products));
    } catch (error) {
      alert("Hubo un error al obtener los productos eliminados.");
    }
  };
}

export function deleteProduct(productId) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "DELETE",
        withCredentials: true,
        url: "/products",
        data: { id: productId },
      });
      if (res.data.message === "Removed successfully") {
        return dispatch(setDeleteProduct(productId));
      }
    } catch (error) {
      alert("Hubo un problema al eliminar el producto");
    }
  };
}

export function createProduct(producto) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        withCredentials: true,
        data: producto,
        url: "/products",
      });
      return;
    } catch (error) {
      console.log("error: ", error);
      throw new Error(error);
    }
  };
}

export function recoveryProduct(productId) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PATCH",
        withCredentials: true,
        data: { id: productId },
        url: "/products",
      });
      return dispatch(setDeleteProduct(res.data.product._id));
    } catch (error) {
      alert("Hubo un problema al recuperar el producto");
    }
  };
}

export function modifyProduct(product) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PUT",
        withCredentials: true,
        data: product,
        url: "/products",
      });
      console.log(res.data);
      return dispatch(setModifyProduct(res.data.product));
    } catch (error) {
      // alert("Hubo un problema al modificar el producto");
      throw new Error("");
    }
  };
}

// ---------- CATEGORIAS ----------

export function getCategories() {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        withCredentials: true,
        url: "/categories",
      });
      return dispatch(setCategories(res.data.categories));
    } catch (error) {
      alert("Hubo un problema al obtener las categorias");
    }
  };
}

export function createCategory(cat) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        withCredentials: true,
        data: cat,
        url: "/categories",
      });
      return dispatch(setNewCategory(res.data.category));
    } catch (error) {
      alert("Hubo un problema al crear la categoria");
    }
  };
}

export function modifyCategory(cat) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PUT",
        withCredentials: true,
        data: cat,
        url: "/categories",
      });
      return dispatch(setModifyCategory(res.data.category));
    } catch (error) {
      console.log("error", error);
      alert("Hubo un problema al modificar la categoria");
    }
  };
}

export function deleteCategory(categoryId) {
  return async (dispatch) => {
    try {
      await axios({
        method: "DELETE",
        withCredentials: true,
        url: "/categories",
        data: { id: categoryId },
      });
      return dispatch(setDeleteCategory(categoryId));
    } catch (error) {
      alert("Hubo un problema al obtener los productos");
    }
  };
}
