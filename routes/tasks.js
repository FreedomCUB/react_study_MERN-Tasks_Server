const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//create Task
//api/tasks
router.post(
  "/",
  auth,
  [
    check("name", "Escriba una tarea")
      .not()
      .isEmpty(),
    check("project", "Escriba una proyecto")
      .not()
      .isEmpty()
  ],
  taskController.createTask
);

// find tasks by project
router.get("/", auth, taskController.tasksFind);

// update task
router.put("/:id", auth, taskController.updateTask);

// delete task
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
