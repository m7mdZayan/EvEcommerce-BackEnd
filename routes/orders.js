const express = require("express");
const Order = require("../models/Order");
const auth = require("../middlewares/auth");

const orderRouter = express.Router();

// Get all orders

orderRouter.get("/", async (req, res) => {
  const orders = await Order.find()
    .populate("products")
    .populate("owner", "-password");
  res.send(orders);
});

// Get user orders

orderRouter.get("/my-orders", auth, async (req, res) => {
  const orders = await Order.find({ owner: req.user._id })
    .populate("products")
    .populate("owner", "-password");
  res.send(orders);
});
// add new order

orderRouter.post("/", auth, async (req, res) => {
  order = new Order({
    totalPrice: req.body.totalPrice,
    state: "pending",
    products: req.body.products,
    owner: req.user._id,
  });

  order = await order.save();
  res.send(order);
});

// changer order state

orderRouter.put("/", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.body.id,
    {
      $set: {
        state: req.body.state,
      },
    },
    {
      new: true,
    }
  );

  res.send(order);
});

// delete an order

orderRouter.delete("/", async (req, res) => {
  const result = await Order.deleteOne({ _id: req.body.id });
  res.send(result);
});

module.exports = orderRouter;
