const express = require("express");
const router = express();

// controller auth
const { login, logout } = require("../controller/authController");

// controller tasks
const {
  getAllTaskData,
  getTasksById,
  createTasks,
  updateTasks,
  deleteTasks,
} = require("../controller/taskController");

router.get("/", (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: "Task Management API App",
  });
});

// routes login and logout
router.post("/api/login", login);
router.post("/api/logout", logout);

// tasks routes
router.get("/api/tasks", getAllTaskData);
router.get("/api/tasks/:id", getTasksById);
router.post("/api/createTasks", createTasks);
router.put("/api/updateTask/:id", updateTasks);
router.delete("/api/deleteTasks/:id", deleteTasks);

module.exports = router;
