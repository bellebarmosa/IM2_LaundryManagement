
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/profile", userController);
router.post("/register", userController);
router.get("/login", userController);
router.post("/login", userController);
router.get("/employees",userController);
router.put('/edit/:employeeID',userController);

module.exports = router;