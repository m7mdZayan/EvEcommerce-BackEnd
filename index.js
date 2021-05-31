const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const productsRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
const categoriesRouter = require("./routes/categories");
const subCategoriesRouter = require("./routes/sub-categories");

const app = express();
const port = process.env.port || 3000;

mongoose
  .connect("mongodb://localhost/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/sub-categories", subCategoriesRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port);
