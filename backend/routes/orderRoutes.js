
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/services", orderController);
router.get("/garments", orderController);
router.get("/customers", orderController);
router.post("/addOrder", orderController);
router.post("/services",orderController);
router.put('/editService/:serviceID',orderController);

module.exports = router;