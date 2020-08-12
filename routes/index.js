const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("<h1>Hello</h1>");
});
// router.use("/users", require("./users"));

// router.use("/api", require("./api"));

module.exports = router;
