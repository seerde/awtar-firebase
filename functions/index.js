const functions = require("firebase-functions");
require("dotenv").config();
const admin = require("firebase-admin");
const express = require("express");
const path = require("path");
const app = express();

admin.initializeApp();

app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "./front-end/build")));

// Require Route Files
const MessagesRouter = require("./routes/messages");
// const UserRouter = require("./routes/login");
const dataRouter = require("./routes/data");
// const AdminRouter = require("./routes/dashboard/dashLogin");

/*** Routes ***/
app.use(MessagesRouter);
app.use(dataRouter);
// app.use(UserRouter);
// app.use(AdminRouter);

app.get("/api/getEmailJsData/:template", async (req, res) => {
  const template = req.params.template;
  let emailJsData = {
    userID: process.env.userID,
    serviceID: process.env.serviceID,
  };
  if (template === "contact") {
    emailJsData.templateID = process.env.templateID_Contact;
  } else {
    emailJsData.templateID = process.env.templateID_Services;
  }
  res.json(emailJsData);
});

app.get("/api/firebaseData/", async (req, res) => {
  const data = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  };
  res.json(data);
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "./testing/build", "index.html"));
});

exports.app = functions.https.onRequest(app);
