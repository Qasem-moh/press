const { client, DB_NAME } = require("../DataBase/config");
let mongo = require("mongodb");
function getNews(result) {
  client
    .db(DB_NAME)
    .collection("news")
    .find({})
    .toArray((err, values) => {
      result(values);
    });
}

function getNewsByID(id, result) {
  try {
    client
      .db(DB_NAME)
      .collection("news")
      .findOne({ _id: new mongo.ObjectId(id) })
      .then((value) => {
        result({ state: 200, data: value });
      });
  } catch (error) {
    result({ state: 404 });
  }
}

function addPost(title, image, text, callback) {
  client
    .db(DB_NAME)
    .collection("news")
    .insertOne({
      title: title,
      image_url: image,
      content: text,
      date: getDate(),
    })
    .then((e) => {
      callback(true);
    });
}
function editPost(id, title, image, text, callback) {
  client
    .db(DB_NAME)
    .collection("news")
    .updateOne(
      { _id: mongo.ObjectId(id) },
      {
        $set: {
          title: title,
          image_url: image,
          content: text,
          date: getDate(),
        },
      }
    )
    .then((e) => {
      callback(true);
    });
}

function removePost(id, callback) {
  console.log(id);
  client
    .db(DB_NAME)
    .collection("news")
    .deleteOne({ _id: mongo.ObjectId(id) })
    .then((e) => {
      callback(true);
    });
}

function getDate() {
  const yourDate = new Date();
  return yourDate.toISOString().split("T")[0];
}
module.exports = { getNews, getNewsByID, addPost, removePost, editPost };
