const express = require("express");
const userRoutes = require("./routes/user.routes");
const eventRoutes = require("./routes/event.routes");
const cors = require("cors");

const connectDB = require("./config/db");
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(cors());

// APIs

app.get("/", (req, res) => res.send("API is running"));

app.use("/user", userRoutes);

app.use("/event", eventRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`----- server started on port ${PORT} -----`.white.bgBlue.italic);
});
