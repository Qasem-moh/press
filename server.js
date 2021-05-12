const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const { route } = require("./API/PagesAPI");
const { APIroute } = require("./API/API");
const PORT = 3000;
app.use(bodyparser.json());
app.use("/", route);
app.use("/api", APIroute);

app.listen(PORT, () => {
  console.log("Server is running !");
});
