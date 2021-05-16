// Require necessary NPM packages
const express = require("express");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

const admin = require("firebase-admin");

function getRandomId() {
  return "xxxxxxxxxxxxxxxxyxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /articles
 * Description:   Get All Articles
 */
router.get("/api/Messages", async (req, res) => {
  // console.log("get /Messages");

  // Message.find({}, (err, messages) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //
  //   res.json(messages);
  // });
  let allMessages = [];
  const messages = await admin.firestore().collection("MESSAGES").get();
  messages.docs.map((doc) => allMessages.push(doc.data()));

  res.json(allMessages);
});

/**
 * Action:       CREATE
 * Method:       POST
 * URI:          /articles
 * Description:  Create a new Article
 */

router.post("/api/Messages", async (req, res) => {
  // Message.create(req.body)
  // On a successful `create` action, respond with 201
  // HTTP status and the content of the new article.
  let date = new Date();
  let messageData = req.body;
  messageData._id = getRandomId();
  messageData.publishedOn = date;
  await admin
    .firestore()
    .collection("MESSAGES")
    .doc(messageData._id)
    .set(messageData);
});

/**
 * Action:       DESTROY
 * Method:       DELETE
 * URI:          /articles/:id
 * Description:  Delete An Article by Article ID
 */
// another way (using Callback, and without extra thing)
router.delete("/api/Messages/:id", (req, res) => {
  // console.log("PARAMS:", req.params);
  // mongoose.Types.ObjectId ('4ed3ede8844f0f351100000c')
  // Message.findOneAndDelete({ _id: req.params.id }, (err, result) => {
  //   if (err) {
  //     res.json(err);
  //   } else {
  //     res.json("DELETE SUCCESS");
  //   }
  // });

  admin.firestore().collection("MESSAGES").doc(req.params.id).delete();
});

// Export the Router so we can use it in the server.js file
module.exports = router;
