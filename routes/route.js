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

// middleware
const { authMiddleware } = require("../middleware/middleware");

router.get("/", (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: "Task Management API App",
  });
});

// routes login and logout
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);

// tasks routes
router.get("/api/tasks", authMiddleware, getAllTaskData);
router.get("/api/tasks/:id", authMiddleware, getTasksById);
router.post("/api/createTasks", authMiddleware, createTasks);
router.put("/api/updateTask/:id", authMiddleware, updateTasks);
router.delete("/api/deleteTasks/:id", authMiddleware, deleteTasks);

module.exports = router;
