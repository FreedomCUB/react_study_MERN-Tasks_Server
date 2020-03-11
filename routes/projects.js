const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//create project
// api/projects
router.post(
  "/",
  auth,
  [
    check("name", "Escriba un nombre de proyecto")
      .not()
      .isEmpty()
  ],

  projectController.createProject
);

// find all projects
router.get(
  "/",

  auth,
  projectController.findProjects
);

// Update project by ID
router.put(
  "/:id",
  auth,
  [
    check("name", "Escriba un nombre de proyecto")
      .not()
      .isEmpty()
  ],
  projectController.updateProject
);

// delete project
router.delete(
  "/:id",
  auth,
  projectController.deleteProject
);
module.exports = router;
