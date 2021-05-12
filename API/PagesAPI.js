const express = require("express");
const route = express.Router();

route.route("/").get((req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});
route.route("/content/:id").get((req, res) => {
  res.sendFile(__dirname + "/public/html/resulte.html");
});
route.route("/admin/").get((req, res) => {
  res.sendFile(__dirname + "/public/html/admin.html");
});
route.route("/covid-19/").get((req, res) => {
  res.sendFile(__dirname + "/public/html/covid19.html");
});
route.route("/js/index").get((req, res) => {
  res.sendFile(__dirname + "/public/js/index.js");
});
route.route("/js/admin").get((req, res) => {
  res.sendFile(__dirname + "/public/js/admin.js");
});
route.route("/js/result").get((req, res) => {
  res.sendFile(__dirname + "/public/js/result.js");
});
route.route("/css/index").get((req, res) => {
  res.sendFile(__dirname + "/public/css/index.css");
});
route.route("/css/result").get((req, res) => {
  res.sendFile(__dirname + "/public/css/result.css");
});
route.route("/css/admin").get((req, res) => {
  res.sendFile(__dirname + "/public/css/admin.css");
});
route.route("/fav").get((req, res) => {
  res.sendFile(__dirname + "/public/img/z.png");
});

route.route("/world/").get((req, res) => {
  res.sendFile(__dirname + "/public/html/world.html");
});
route.route("/sport/").get((req, res) => {
  res.sendFile(__dirname + "/public/html/sport.html");
});
route.route("/report/").get((req, res) => {
  res.sendFile(__dirname + "/public/html/reports.html");
});
route.route("/about/").get((req, res) => {
  res.sendFile(__dirname + "/public/html/about.html");
});
module.exports = { route };
