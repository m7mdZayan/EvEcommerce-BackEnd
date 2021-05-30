const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  totalPrice: Number,
  state: {
    type: String,
    enum: ["pending", "being sent", "deleivered"],
    default: "pending",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
