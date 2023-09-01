const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes.js");
const propertyRoutes = require("./routes/propertyRoutes.js")

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
// for cross-orgin error
app.use(cors());

app.get("/", (req, res) => {
  res.json("this is homepage");
});

app.use("/user", userRoutes);
app.use("/property", propertyRoutes);

app.listen(PORT, () => {
  console.log(
    `000----------------------------Server is running on http://localhost:${PORT}---------------------->>>`
  );
});
