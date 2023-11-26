
const express = require("express");
const db = require("../models/db");

const router = express.Router();

router.get("/services", (req, res) => {
 
    db.query("SELECT * FROM services", (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No services found" });
            }
        }
    });
});

router.get("/garments", (req, res) => {

    db.query("SELECT * FROM garments", (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No garments found" });
            }
        }
    });
});

router.get("/customers", (req, res) => {
  
    db.query("SELECT * FROM customers", (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No customers found" });
            }
        }
    });
});

router.post("/addOrder", async (req, res) => {
  
    try {
        const newOrder = req.body.newOrder;
        const customer = req.body.customer;
        const employee = req.body.employee;
        const total = req.body.total;
        const order_pickUP = req.body.order_pickUP;
        const order_paidAmount = req.body.order_paidAmount;
    
         db.beginTransaction();
    
        const insertOrderQuery =
          "INSERT INTO `orders`(`customer_ID`, `employee_ID`, `order_date`, `order_pickup`, `order_total`, `order_paidAmount`) VALUES (?, ?, ?, ?, ?, ?)";
    
        const result1 = await db.queryAsync(insertOrderQuery, [
          customer.customer_ID,
          employee.employee_ID,
          new Date(),
          order_pickUP,
          total,
          order_paidAmount,
        ]);
    
        const orderID = result1.insertId;
    
        for (const orderDetails of newOrder) {
          const insertOrderDetailsQuery =
            "INSERT INTO `orderdetails`(`order_ID`, `quantity`, `order_price`, `service_ID`) VALUES ?";
          const bulkOrderDetails = [
            [orderID, orderDetails.qty, orderDetails.amount, orderDetails.service_ID],
          ];
    
          const result2 = await db.queryAsync(insertOrderDetailsQuery, [bulkOrderDetails]);
    
          const detailID = result2.insertId;
    
          const garmentsInOrder =
            "INSERT INTO `garmentsinorder`(`orderDetails_ID`, `garment_ID`,`qty`) VALUES ?";
          const bulkGarmentsOrder = orderDetails.garmentsIn.map((garments) => [
            detailID,
            garments.garment_ID,
            garments.quantity,
          ]);
    
          const result3 = await db.queryAsync(garmentsInOrder, [bulkGarmentsOrder]);
        }
    
        await db.commitAsync();
    
        res.send({ message: "Data uploaded successfully" });
      } catch (error) {
        await db.rollbackAsync();
    
        res.status(500).send({ error: error.message });
      }
});

module.exports = router;