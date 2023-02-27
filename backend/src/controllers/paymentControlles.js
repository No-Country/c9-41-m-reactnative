import wrapAsync from "../../utils/wrapAsync.js";
import User from "../db/models/user.js";
import Address from "../db/models/address.js";
import Order from "../db/models/order.js";
import OrderItem from "../db/models/orderItem.js";
import CartItem from "../db/models/cartItem.js";
import Product from "../db/models/product.js";

export const convertirCarritoEnOrden = wrapAsync(async (req, res, next) => {
  const cart = await User.getCart(req.user._id);

  if (!cart.length)
    return res.status(400).json({ message: "The order has no products" });

  let address = "";

  if (req.body.shippingMethod === "delivery") {
    address = await Address.findById(req.body.shippingAddress);
    if (!address)
      return res.status(400).json({ message: "Shipping address error" });
  }

  console.log("address", address);

  let result = 0;
  for (const product of cart) {
    let final = product.quantity * product.productId.price;
    result += final;
  }

  const order = await Order.create({
    total: result,
    paymentMethod: "MercadoPago",
    shippingAddress:
      req.body.shippingMethod === "delivery"
        ? `${address.street} ${address.number}, ${address.city}, ${
            address.zipCode
          }, ${address.province}. Detalle: ${
            address.detail || "----"
          }. Contacto: ${address.contact || "----"}.`
        : "retiro local",
    shippingMethod: req.body.shippingMethod,
    userId: req.user._id,
  });

  if (!order)
    return res
      .status(400)
      .json({ message: "Hubo algun problema con la creación de la orden" });

  const productoParaReq = [];

  try {
    for (const itemCart of cart) {
      const orderItem = await OrderItem.create({
        name: itemCart.productId.name,
        quantity: itemCart.quantity,
        price: itemCart.productId.price,
        productId: itemCart.productId._id,
        orderId: order._id,
      });
      order.orderItems.push(orderItem._id);
      await order.save();
      productoParaReq.push({
        title: itemCart.productId.name,
        description: itemCart.productId.description?.length
          ? itemCart.productId.description
          : "Sin descripcion",
        picture_url: itemCart.productId.images?.length
          ? itemCart.productId.image[0]?.url
          : "Sin imagen",
        category_id: "Prod Restaurant noCountry",
        quantity: itemCart.quantity,
        unit_price: itemCart.productId.price,
      });
      // actualizar stock
      await Product.findByIdAndUpdate(
        {
          _id: itemCart.productId._id,
        },
        { stock: itemCart.productId.stock - itemCart.quantity }
      );
    }
  } catch (e) {
    await OrderItem.deleteMany({ orderId: order._id });
    await Order.findByIdAndDelete(order._id);
    return res.status(400).json({
      message: "Hubo algun problema en la creación de los item de la orden",
    });
  }

  await CartItem.deleteMany({ userId: req.user._id });
  req.user.cart = [];
  req.user.orders.push(order._id);
  await req.user.save();
  return res.status(200).json({ message: "todo bien" });

  // req.body.productos = productoParaReq;
  // req.body.idOrder = order.id;

  // next();
});
