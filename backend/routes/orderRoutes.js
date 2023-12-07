
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/services", orderController);
router.get("/garments", orderController);
router.get("/customers", orderController);
router.post("/addOrder", orderController);
router.post("/services",orderController);
router.put('/editService/:serviceID',orderController);
router.get('/totalorders',orderController);
router.get ('/recentorders',orderController);
router.put('/editorder/:orderId',orderController);
router.delete('/deleteService/:serviceId',orderController)
router.get ('/orders',orderController);
router.post("/customers",orderController);
router.delete('/customers/:customerId',orderController);
router.put('/customers/:customerId',orderController);


// router.put('/editOrder/:orderId',orderController)

module.exports = router;