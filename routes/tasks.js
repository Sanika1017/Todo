const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");

// All task routes are protected
router.get("/", auth, taskController.getAllTasks);
router.post("/", auth, taskController.createTask);
router.put("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);
router.put("/complete/:id", auth, taskController.toggleComplete);

module.exports = router;