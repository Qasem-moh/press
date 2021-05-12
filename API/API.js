const express = require("express");
const {
  getNews,
  getNewsByID,
  addPost,
  removePost,
  editPost,
} = require("../Repo/repo");
const APIroute = express.Router();

APIroute.route("/news").get((req, res) => {
  getNews((data) => {
    res.send(data);
  });
});
APIroute.route("/news/id/:id").get((req, res) => {
  let id = req.params.id;
  getNewsByID(id, (result) => {
    if (result.state) {
      res.send(result);
    } else {
      res.send({ state: 404 });
    }
  });
});
APIroute.route("/news/add/").post((req, res) => {
  let title = req.body.title;
  let image = req.body.image_url;
  let text = req.body.content;

  addPost(title, image, text, (callback) => {
    res.send({ state: 200, log: "added" });
  });
});
APIroute.route("/news/edit/").post((req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  let image = req.body.image_url;
  let text = req.body.content;
  console.log(req.body.content);
  editPost(id, title, image, text, (callback) => {
    res.send({ state: 200, log: "edited" });
  });
});
APIroute.route("/news/remove/").post((req, res) => {
  let id = req.body.id;
  removePost(id, (callback) => {
    res.send({ state: 200, log: "removed" });
  });
});
APIroute.route("/news/edit/").post((req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  let image_url = req.body.image_url;
  let content = req.body.content;

  editPost(id, title, image_url, content, (callback) => {
    res.send({ state: 200, log: "edited" });
  });
});
APIroute.route("/news/get/:id").get((req, res) => {
  let id = req.params.id;
  getNewsByID(id, (callback) => {
    res.send({ state: 200, data: callback });
  });
});
module.exports = { APIroute };
