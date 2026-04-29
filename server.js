const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

console.log("STARTING SERVER...");

// ✅ MongoDB Connection (use ENV variable)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error ❌", err));

// ✅ Schema
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// ✅ Model
const Order = mongoose.model("Order", orderSchema);

// ✅ Serve Frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Save Order
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    res.json({ message: "Order saved successfully ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error saving order ❌" });
  }
});

// ✅ Get All Orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error fetching orders ❌" });
  }
});

// ✅ Dynamic PORT (VERY IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});