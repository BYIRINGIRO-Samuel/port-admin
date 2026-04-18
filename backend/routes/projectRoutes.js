const express = require('express');
const multer = require('multer');
const path = require('path');
const Project = require('../models/Project');

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});
const upload = multer({ storage });

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new project
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, category, shortDesc, tech, github, demo } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newProject = new Project({
      name,
      category,
      shortDesc,
      tech,
      github,
      demo,
      imageUrl
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.deleteOne();
    // (Optional) Remove the uploaded file from the fs here using fs.unlink
    
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a project
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, category, shortDesc, tech, github, demo } = req.body;
    let project = await Project.findById(req.params.id);
    
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.name = name || project.name;
    project.category = category || project.category;
    project.shortDesc = shortDesc || project.shortDesc;
    project.tech = tech || project.tech;
    project.github = github !== undefined ? github : project.github;
    project.demo = demo !== undefined ? demo : project.demo;

    if (req.file) {
      project.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
