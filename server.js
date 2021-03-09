const express = require("express");
const server = express();
const port = 8000;
var path = require("path");

const midd = (req, res, next) => {
  var date = new Date();
  var current_hour = date.getHours();
  var current_day = date.getDay();
  console.log("day" + current_day);
  if (
    current_day >= 1 &&
    current_day < 6 &&
    current_hour <= 17 &&
    current_hour >= 9
  ) {
    console.log(current_hour);

    return next();
  } else {
    res.send(`<h1>app close</h1>`);
  }
};

server.use("/", midd, express.static(path.join(__dirname, "pages")));
server.get("/", midd, (req, res) => {
  res.sendFile(__dirname + "/pages/home.html");
});
server.use("/", midd, (req, res) => {
  res.send("404");
});
server.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("server is runing");
  }
});