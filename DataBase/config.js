const MongoClient = require("mongodb").MongoClient;
const DB_NAME = "zain";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
client.connect((err, client0) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MongoDB is Conncted");
  }
});
module.exports = { client, DB_NAME };
