/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const Comment = require("./models/comment");
const Entry = require("./models/entry");
const Journal = require("./models/journal");
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.get("/journals", (req, res) => {
  // gets all journals
  Journal.find({}).then((journals) => res.send(journals));
});

router.post("/journal", auth.ensureLoggedIn, (req, res) => {
  const newJournal = new Journal({
    collaborator_ids: [req.user._id],
    collaborator_names: [req.user.name],
    entries_list: [],
  });

  newJournal.save().then((journal) => res.send(journal));
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", auth.ensureLoggedIn, (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
    timestamp: req.body.timestamp,
  });

  newComment.save().then((comment) => res.send(comment));
});

router.get("/entry", (req, res) => {
  Entry.find({ parent: req.query.parent }).then((entries) => {
    res.send(entries);
  });
});

router.post("/entry", auth.ensureLoggedIn, (req, res) => {
  const newEntry = new Entry({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    prompt: req.body.prompt,
    content: req.body.content,
  });

  newEntry.save().then((entry) => res.send(entry));
});

router.post("/login", auth.login, (req, res) => {
  console.log("called login API");
});
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
