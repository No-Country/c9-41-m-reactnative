import wrapAsync from "../../utils/wrapAsync.js";
import User from "../db/models/user.js";

export const convertirCarritoEnOrden = wrapAsync(async (req, res, next) => {
  const cart = await User.getCart(req.user._id);
  console.log(req.user);
  console.log("cart", cart);

  if (!cart.length)
    return res.status(400).json({ message: "The order has no products" });

  const address = req.user.address[req.body.shippingAddress];

  if (!address)
    return res.status(400).json({ message: "Shipping address error" });

  return res.status(200).json({ message: "todo bien" });

  // let result = 0;
  // if (carrito.CartItems) {
  //   for (const producto of carrito.CartItems) {
  //     let final = producto.quantity * producto.Product.price;
  //     result += final;
  //   }
  // }

  // const order = await Order.create({
  //   total: result,
  //   paymentMethod: "MercadoPago",
  //   shippingAddress: `${direccion.street} ${direccion.number}, ${
  //     direccion.city
  //   }, ${direccion.zipCode}, ${direccion.province}. Detalle: ${
  //     direccion.detail || "----"
  //   }. Contacto: ${direccion.contact || "----"}.`,
  //   userId: req.user.id,
  // });

  // if (!order)
  //   return res
  //     .status(400)
  //     .json({ message: "Hubo algun problema con la creación de la orden" });

  // const productoParaReq = [];

  // try {
  //   for (const itemCarrito of carrito.CartItems) {
  //     await OrderItem.create({
  //       name: itemCarrito.Product.name,
  //       price: itemCarrito.Product.price,
  //       quantity: itemCarrito.quantity,
  //       size: itemCarrito.Stock.size,
  //       color: itemCarrito.Stock.color,
  //       OrderId: order.id,
  //       ProductId: itemCarrito.Product.id,
  //       StockId: itemCarrito.Stock.id,
  //     });
  //     productoParaReq.push({
  //       title: itemCarrito.Product.name,
  //       description: itemCarrito.Product.description?.length
  //         ? itemCarrito.Product.description
  //         : "Sin descripcion",
  //       picture_url: itemCarrito.Product.image?.length
  //         ? itemCarrito.Product.image[0]
  //         : "Sin imagen",
  //       category_id: "Prod eCommerce Melinda Muriel",
  //       quantity: itemCarrito.quantity,
  //       unit_price: itemCarrito.Product.price,
  //     });
  //   }
  //   // actualizando stock productos
  //   for (const itemCarrito of carrito.CartItems) {
  //     const stock = await Stock.findOne({
  //       where: {
  //         id: itemCarrito.Stock.id,
  //       },
  //     });
  //     await stock.decrement({ quantity: parseInt(itemCarrito.quantity) });
  //   }
  // } catch (e) {
  //   await Order.destroy({
  //     where: {
  //       id: order.id,
  //     },
  //   });
  //   console.log("error aca", e);
  //   return res.status(400).json({
  //     message: "Hubo algun problema en la creación de los item de la orden",
  //   });
  // }

  // await CartItems.destroy({
  //   where: {
  //     CartId: carrito.id,
  //   },
  // });

  // req.body.productos = productoParaReq;
  // req.body.idOrder = order.id;

  // next();
});
