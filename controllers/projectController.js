const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createProject = async (req, res) => {
  // search errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create new peoject
    const projectdb = new Project(req.body);

    // save creator jtw
    projectdb.creator = req.userdb.id;

    // save project
    projectdb.save();
    res.json(projectdb);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// find  all projects from User
exports.findProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.userdb.id });
    res.json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// update project
exports.updateProject = async (req, res) => {
  // search errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extract inf from project
  const { name } = req.body;
  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    // Check ID
    let project = await Project.findById(req.params.id);

    // find project
    if (!project) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // creator verificated
    if (project.creator.toString() !== req.userdb.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // update
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );
     res.json({project});
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

// DELETE project by ID
exports.deleteProject = async (req, res) => {
   
    try {
      // Check ID
      let project = await Project.findById(req.params.id);
  
      // find project
      if (!project) {
        return res.status(404).json({ msg: "Proyecto no encontrado" });
      }
  
      // creator verificated
      if (project.creator.toString() !== req.userdb.id) {
        return res.status(401).json({ msg: "No autorizado" });
      }
  
     // delete project
     await Project.findOneAndRemove({ _id: req.params.id })
      res.json({ msg: 'Proyecto eliminado' });
      
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
    }
  };