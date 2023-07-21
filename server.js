const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 5000;
app.use(express.json());

const usersRoute = require("../compassbus/routes/usersRoute");
const busesRoute = require("../compassbus/routes/busesRoute");
const bookingsRoute = require("../compassbus/routes/bookingsRoute");

app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
);

app.listen(port, () => console.log(`Listening on port ${port}`));
