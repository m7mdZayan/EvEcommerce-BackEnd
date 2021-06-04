const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

const orderRouter = express.Router();

// Get all orders

orderRouter.get("/", async (req, res) => {
  const orders = await Order.find()
    .populate("products")
    .populate("owner", "-password");
  res.send(orders);
});

// add new order

orderRouter.post("/", async (req, res) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, "JWTPRIVATEKEY");

  order = new Order({
    totalPrice: req.body.totalPrice,
    state: "pending",
    products: req.body.products,
    owner: decoded._id,
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
