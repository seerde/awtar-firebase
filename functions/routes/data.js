const express = require("express");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

const admin = require("firebase-admin");

// get all data ordered by order
router.get("/api/getData", async (req, res) => {
  try {
    // const allData = await Projects.find({}).sort("order").exec();
    // res.send({ allData });

    let allData = [];
    const projects = await admin
      .firestore()
      .collection("PROJECTS")
      .orderBy("order")
      .get();
    projects.docs.map((doc) => allData.push(doc.data()));
    res.send({ allData });
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// get specific data
router.get("/api/getData/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    // const allData = await Projects.find({ "name.en": req.params.id });

    let allData = [];
    const projects = await admin.firestore().collection("PROJECTS");
    const specificProject = await projects
      .where("name.en", "==", req.params.id)
      .get();
    specificProject.forEach((e) => {
      allData.push(e.data());
    });
    // specificProject.docs.map((doc) => allData.push(doc.data()));
    // console.log(allData);
    res.send({ allData });
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// get data to use it in gallery
router.post("/api/getDataForGallery", async (req, res) => {
  try {
    // console.log(req.params.id);
    let allData = [];
    // await Projects.find({ "name.en": req.body.name }, (err, proj) => {
    //   console.log(proj[0]);
    //   proj[0].project.map((e) => {
    //     // console.log("ID: ", e._id);
    //     if (e._id == req.body.id) {
    //       allData = e;
    //     }
    //   });
    // });

    const projects = await admin.firestore().doc(`PROJECTS/${req.body.name}`);
    await projects.get().then(function (doc) {
      if (doc && doc.exists) {
        doc.data().project.forEach((e) => {
          if (e._id === req.body.id) {
            allData = e;
          }
        });
      }
    });
    res.send({ allData });
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// delete project from dashboard
router.delete("/api/deleteProject/:id/:name", async (req, res) => {
  const id = req.params.id;
  const name = req.params.name;

  // await Projects.findOneAndDelete({ _id: id }, (err, result) => {
  //   if (err) {
  //     res.json(err);
  //   } else {
  //     res.json("DELETE SUCCESS");
  //   }
  // });
  await admin.firestore().collection("PROJECTS").doc(name).delete();
});

// add project from dashboard
router.post("/api/addProject", async (req, res) => {
  try {
    // const newProject = req.body.project;
    // await Projects.insertMany(newProject),
    //   (err, result) => {
    //     if (err) res.json(err);
    //     else res.json("INSERT SUCCESS");
    //   };
    let project = req.body.project;

    function getRandomId() {
      return "xxxxxxxxxxxxxxxxyxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
    project._id = getRandomId();

    admin
      .firestore()
      .collection("PROJECTS")
      .doc(project.name.en)
      .get()
      .then(async (e) => {
        if (e.exists) {
          let rand = Math.round(Math.random() * 100);
          project.name.en += " " + rand;
          await admin
            .firestore()
            .collection("PROJECTS")
            .doc(project.name.en)
            .set(project);
        } else {
          await admin
            .firestore()
            .collection("PROJECTS")
            .doc(project.name.en)
            .set(project);
        }
      });
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// update project from dashboard
router.post("/api/updateProject", async (req, res) => {
  const { projectName, projectData } = req.body;
  try {
    // await Projects.updateOne({ "name.en": projectName }, projectData),
    //   (err, result) => {
    //     if (err) res.json(err);
    //     else res.json("UPDATE SUCCESS");
    //   };

    function getRandomId() {
      return "xxxxxxxxxxxxxxxxyxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (projectData.project.length !== 0) {
      projectData.project.forEach((e, index) => {
        if (!("_id" in e)) {
          projectData.project[index]._id = getRandomId();
        }
      });
    }

    const newProject = await admin
      .firestore()
      .collection("PROJECTS")
      .doc(projectData.name.en)
      .set(projectData);

    if (projectData.name.en !== projectName) {
      await admin.firestore().collection("PROJECTS").doc(projectName).delete();
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// Export the Router so we can use it in the server.js file
module.exports = router;
