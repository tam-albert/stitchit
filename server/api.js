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
const Prompt = require("./models/prompt");
const Draft = require("./models/draft");

const mongoose = require("mongoose");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

// initialize AWS S3 instance
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const AWS_REGION = "us-east-1";
const PROFILE_BUCKET_NAME = "stitch-it-profile-upload";
const client = new S3Client({ region: AWS_REGION });

const { v4: uuidv4 } = require("uuid");

router.get("/journals", auth.ensureLoggedIn, (req, res) => {
  // gets all journals with given ID (or all of them if none provided)
  const query = { collaborator_ids: req.user._id };
  if (req.query.journalId) {
    try {
      const objectId = new mongoose.mongo.ObjectID(req.query.journalId);
      Journal.findById(objectId).then((journals) => res.send(journals));
    } catch (e) {
      res.status(404).send();
    }
  } else {
    Journal.find(query).then((journals) => {
      res.send(journals);
    });
  }
});

router.get("/journalEntries", (req, res) => {
  try {
    const objectId = new mongoose.mongo.ObjectID(req.query.journalId);
    Journal.findById(objectId).then((journal) => {
      Entry.find({
        _id: { $in: journal.entries_list },
      }).then((entries) => res.send(entries));
    });
  } catch (e) {
    res.status(404).send();
  }
});

router.post("/newjournal", auth.ensureLoggedIn, (req, res) => {
  if (req.body.name.length > 50) res.status(400).send("Journal name too long");
  const newJournal = new Journal({
    collaborator_ids: [req.user._id],
    collaborator_names: [req.user.name],
    entries_list: [],
    name: req.body.name === "" ? "Untitled Journal" : req.body.name,
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
        journal_id: req.body.journal,
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

router.get("/prompt", (req, res) => {
  Prompt.find({ date: req.query.date }).then((prompts) => {
    res.send(prompts);
  });
});

router.post("/prompt", auth.ensureLoggedIn, (req, res) => {
  const newPrompt = new Prompt({
    content: req.body.content,
    likes: req.body.likes,
    date: req.body.date,
  });

  newPrompt.save().then((prompt) => res.send(prompt));
});

router.get("/draft", auth.ensureLoggedIn, (req, res) => {
  Draft.find({ creator_id: req.user._id }).then((drafts) => {
    res.send(drafts);
  });
});

router.post("/draft", auth.ensureLoggedIn, (req, res) => {
  const newDraft = new Draft({
    creator_id: req.user._id,
    content: req.body.content,
  });

  newDraft.save().then((draft) => res.send(draft));
});

router.put("/draft", auth.ensureLoggedIn, (req, res) => {
  try {
    const draftObjectId = new mongoose.mongo.ObjectID(req.body.draftId);
    Draft.findById(draftObjectId).then((draft) => {
      if (draft.creator_id !== req.user._id) {
        res.status(403).send({ msg: "this is not ur draft" });
        return;
      }
      draft.content = req.body.content;
      draft.save();
      res.send(req.body.content);
    });
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/draft", auth.ensureLoggedIn, (req, res) => {
  try {
    const draftObjectId = new mongoose.mongo.ObjectID(req.query.draftId);
    Draft.findOneAndDelete({ _id: draftObjectId, creator_id: req.user._id })
      .then((draft) => {
        res.send(draft);
      })
      .catch((err) => res.send({ msg: err }));
  } catch (e) {
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

router.post("/invite", auth.ensureLoggedIn, (req, res) => {
  // Validate invite ID
  try {
    const userObjectId = new mongoose.mongo.ObjectID(req.body.inviteId);
    User.findById(userObjectId).then((user) => {
      if (!user) {
        // User ID doesn't exist
        res.status(400).send();
        return;
      }

      // Now we have a user to invite, so we find journal
      try {
        const journalObjectId = new mongoose.mongo.ObjectID(req.body.journalId);
        Journal.findById(journalObjectId).then((journal) => {
          // make sure owner is in journal
          if (journal.collaborator_ids.includes(req.user._id)) {
            if (!journal.collaborator_ids.includes(req.body.inviteId)) {
              // add only if not there already
              journal.collaborator_ids.push(req.body.inviteId);
              journal.collaborator_names.push(user.name);
            }

            journal.save();
            res.send({ userName: user.name });
            return;
          } else {
            res.status(403).send();
            return;
          }
        });
      } catch (e) {
        // journal id invalid
        res.status(400).send();
        return;
      }
    });
  } catch (e) {
    // was not a valid ObjectId
    res.status(400).send();
    return;
  }
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/images/signedurl", auth.ensureLoggedIn, (req, res) => {
  const uuid = uuidv4();
  const bucketParams = {
    Bucket: PROFILE_BUCKET_NAME,
    Key: uuid,
    ACL: "public-read",
  };

  const command = new PutObjectCommand(bucketParams);
  getSignedUrl(client, command, { expiresIn: 3600 })
    .then((url) => {
      res.send({ url: url, key: uuid });
    })
    .catch((err) => {
      res.status(500).send({ msg: err });
    });
});

router.post("/images/updatepfp", auth.ensureLoggedIn, (req, res) => {
  try {
    const userObjectId = new mongoose.mongo.ObjectID(req.user._id);
    User.findById(userObjectId).then((user) => {
      if (!user) {
        res.status(400).send({ msg: "wtf are you doing??" });
        return;
      }

      user.pfp = req.body.pfpUrl;
      user.save().then(() => {
        res.send({ url: req.body.pfpUrl });
      });
    });
  } catch (e) {
    res.status(400).send({ msg: "This really should not have happened lmfao" });
  }
});

router.post("/images/updatecoverphoto", auth.ensureLoggedIn, (req, res) => {
  // need to add handling to make sure you're not updating a random journal's cover photo
  try {
    const journalObjectId = new mongoose.mongo.ObjectID(req.body.journalId);
    console.log(journalObjectId);
    Journal.findById(journalObjectId).then((journal) => {
      if (!journal) {
        res.status(400).send({ msg: "wtf are you doing??" });
        return;
      }

      if (!journal.collaborator_ids.includes(req.user._id)) {
        res.status(403).send({ msg: "this aint ur journal" });
      }

      journal.cover_photo_url = req.body.photoUrl;
      journal.save().then(() => {
        res.send({ url: req.body.photoUrl });
      });
    });
  } catch (e) {
    res.status(400).send({ msg: "This really should not have happened lmfao" });
  }
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
