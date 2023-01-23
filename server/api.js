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

const mongoose = require("mongoose");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.get("/journals", (req, res) => {
  // gets all journals with given ID (or all of them if none provided)
  if (req.query.journalId) {
    try {
      const objectId = new mongoose.mongo.ObjectID(req.query.journalId);
      Journal.findById(objectId).then((journals) => res.send(journals));
    } catch (e) {
      res.status(404).send();
    }
  } else {
    Journal.find().then((journals) => res.send(journals));
  }
});

router.post("/newjournal", auth.ensureLoggedIn, (req, res) => {
  console.log("damn...");
  const newJournal = new Journal({
    collaborator_ids: [req.user._id],
    collaborator_names: [req.user.name],
    entries_list: [],
    name: req.body.name,
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
  Entry.find({ journal_id: req.query.journalId }).then((entries) => {
    res.send(entries);
  });
});

router.post("/entry", auth.ensureLoggedIn, (req, res) => {
  // Check if requested journal exists at all
  try {
    const objectId = new mongoose.mongo.ObjectID(req.body.journal_id);
    Journal.findById(objectId).then((journal) => {
      const newEntry = new Entry({
        creator_id: req.user._id,
        creator_name: req.user.name,
        prompt: req.body.prompt,
        content: req.body.content,
        journal_id: req.body.journal_id,
      });

      newEntry.save().then((entry) => {
        // Update entries_list in the journal we found
        journal.entries_list.push(entry._id);
        journal.save();
        res.send(entry);
      });
    });
  } catch (e) {
    // Malformed journal ID
    res.status(400).send();
  }
});

router.post("/login", auth.login, (req, res) => {});
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
