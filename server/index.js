const express = require("express");
const authRoute = require("./routes/auth");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(morgan("dev"));
const port = 5001;

app.use(express.json());

app.use("/api/auth", authRoute);
// app.use("/api/admin", adminRoutes);
app.use("/", function (req, res) {
  res.json({ message: "Welcome to gst filing" });
  //__dirname : It will resolve to your project folder.
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
