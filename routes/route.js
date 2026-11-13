const express = require("express");
const router = express();

router.get("/", (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: "Task Management API App",
  });
});

module.exports = router;
