const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

// create new task

exports.createTask = async (req, res) => {
  // search errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // find project
    const { project } = req.body;
    const foundProject = await Project.findById(project);
    if (!foundProject) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // creator verificated
    if (foundProject.creator.toString() !== req.userdb.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Create task
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
// find tasks by project
exports.tasksFind = async (req, res) => {
  try {
    // find project
    const { project } = req.query;
    const foundProject = await Project.findById(project);
    if (!foundProject) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // creator verificated
    if (foundProject.creator.toString() !== req.userdb.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // find tasks by project
    const tasks = await Task.find({ project }).sort({created: -1});
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// udate task
exports.updateTask = async (req, res) => {
  try {
    const { project, name, state } = req.body;

    // find task
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    // find project
    const foundProject = await Project.findById(project);

    // creator verificated
    if (foundProject.creator.toString() !== req.userdb.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // create object with new inf
    const newTask = {};

    if (name) {
      newTask.name = name;
    }
    if (state) {
      newTask.state = state;
    }

    // save tasks
    task = await Task.findOneAndUpdate({ _id: req.params.id }, { $set: newTask }, {
      new: true
    });
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// delete task

exports.deleteTask = async (req, res) => {
  try {
    const { project } = req.query;

    // find task
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    // find project
    const foundProject = await Project.findById(project);

    // creator verificated
    if (foundProject.creator.toString() !== req.userdb.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // delete task
    await Task.findOneAndRemove({_id: req.params.id})
     res.json({msg: 'Tarea Eliminada'});

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};