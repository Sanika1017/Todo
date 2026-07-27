const db = require("../config/db");

// GET all tasks of logged-in user
exports.getAllTasks = (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC",
    [req.user.id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.json(results);
    }
  );
};

// CREATE a new task
exports.createTask = (req, res) => {
  const { task } = req.body;

  if (!task || task.trim() === "") {
    return res.status(400).json({ message: "Task is required" });
  }

  db.query(
    "INSERT INTO tasks (task, user_id) VALUES (?, ?)",
    [task, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({
        message: "Task Added Successfully",
        id: result.insertId,
      });
    }
  );
};

// UPDATE task text
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  if (!task || task.trim() === "") {
    return res.status(400).json({ message: "Task is required" });
  }

  db.query(
    "UPDATE tasks SET task = ? WHERE id = ? AND user_id = ?",
    [task, id, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ message: "Task Updated" });
    }
  );
};

// DELETE task
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ message: "Task Deleted" });
    }
  );
};

// TOGGLE completed status
exports.toggleComplete = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  db.query(
    "UPDATE tasks SET completed = ? WHERE id = ? AND user_id = ?",
    [completed, id, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ message: "Task Status Updated" });
    }
  );
};