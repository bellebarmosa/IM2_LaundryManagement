
const express = require("express");
const db = require("../models/db");

const router = express.Router();

router.get("/services", async(req, res) => {
 
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

router.post('/services',async (req,res)=>{
    try{
        let addService = "INSERT INTO `services`(`service_name`, `service_description`, `service_price`) VALUES (? , ? , ?)";
        const service_name= req.body.service_name;
        const service_description = req.body.service_description;
        const service_price = req.body.service_price;

        db.query(addService,
            [service_name,service_description,service_price],
            (err,result)=>{
                if (err) {
                    console.error(err);  // Log the error for debugging
                    res.status(500).send({ error: 'Internal Server Error' });
                } else {
                    res.send(result);
                }
        })
    }catch{
        res.status(500).send({ error: "ERR DID NOT UPLOAD"});

    }
    })

    router.put('/editservice/:serviceId', async (req, res) => {
      try {
        // Extract parameters from the request
        const { serviceId } = req.params;
        const updatedService = req.body;
    
        // Update the service in the database
        const updateServiceQuery = `UPDATE services SET service_name = ?,service_description = ?,service_price = ? WHERE service_ID = ?;`;
    
        db.query(
          updateServiceQuery,
          [
            updatedService.service_name,
            updatedService.service_description,
            updatedService.service_price,
            serviceId,
          ],
          (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send({ error: 'Internal Server Error' });
            } else {
              res.status(200).send({ message: 'Service updated successfully' });
            }
          }
        );
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });





    router.put('/editorder/:orderId', async (req, res) => {
      try {
        const { orderId } = req.params;
        const { updatedData } = req.body;
    
        const updateOrderQuery =
          'UPDATE orders SET order_total = ?, order_paidAmount = ?, order_status = ? WHERE order_ID = ?';
    
        db.query(
          updateOrderQuery,
          [
            updatedData.order_total,
            updatedData.order_paidAmount,
            updatedData.order_status,
            orderId,
          ],
          (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send({ error: 'Internal Server Error' });
            } else {
              console.log(updatedData)
              res.send(result);
              

            }
          }
        );
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });



router.get("/garments",async (req, res) => {

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

router.get("/customers",async(req, res) => {
  
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

router.post("/customers", async (req, res) => {
  const insertCustomersQuery =
    "INSERT INTO `customers`(`customer_name`, `customer_phone`, `customer_eMail`) VALUES (?,?,?)";
  const newCustomer = {
    customer_name: req.body.customer_name,
    customer_phone: req.body.customer_phone,
    customer_eMail: req.body.customer_eMail,
  };

  db.query(
    insertCustomersQuery,
    [newCustomer.customer_name, newCustomer.customer_phone, newCustomer.customer_eMail],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Data uploaded successfully" });
      }
    }
  );
});

router.put('/customers/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const updatedCustomer = req.body;

    const updateCustomerQuery =
      'UPDATE customers SET customer_name = ?, customer_phone = ?, customer_eMail = ? WHERE customer_ID = ?';

    db.query(
      updateCustomerQuery,
      [
        updatedCustomer.customer_name,
        updatedCustomer.customer_phone,
        updatedCustomer.customer_eMail,
        customerId,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send({ error: 'Internal Server Error' });
        } else {
          res.status(200).send({ message: 'Customer updated successfully' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});



router.delete('/customers/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;

    const deleteCustomerQuery = 'DELETE FROM customers WHERE customer_ID = ?';
    db.query(deleteCustomerQuery, [customerId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
      } else {
        res.send({ message: 'Customer deleted successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


router.post("/addOrder", async (req, res) => {
<<<<<<< Updated upstream
  
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
            "INSERT INTO `orderdetails`(`order_ID`, `quantity`, `order_price`, `service_ID`,`chargePer`) VALUES ?";
          const bulkOrderDetails = [                                                  
            [orderID, orderDetails.qty, orderDetails.amount, orderDetails.service_ID,orderDetails.chargePer],
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
=======
  const laundry_basket = req.body.laundry_basket;
  const customers = req.body.customers;
  const employee = req.body.employee;
  const orderpickup_date = req.body.orderpickup_date;
  const order_total = req.body.order_total;

  console.log(laundry_basket);
  console.log(employee);
  console.log(orderpickup_date);
  console.log(order_total);
  console.log(customers);

  try {
    let query1 = "INSERT INTO orders(customer_ID, employee_ID, order_status, order_date, orderpickup_date, order_total, payment_status, Remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    const result1 = await db.queryAsync(query1, [
      customers.customer_ID,
      employee.employee_ID,
      "Pending",
      new Date(),
      orderpickup_date,
      order_total,
      "Unpaid", // Assuming you want to set the payment_status initially as "Unpaid"
      "No remarks", // You may change this based on your requirements
    ]);

    const orderID = result1.insertId;

    console.log(result1);

    let query2 =
      "INSERT INTO laundrybasket(order_ID, clotheType_ID, serviceType_ID, subTotal, subQuantity) VALUES (?, ?, ?, ?, ?)";



    for (const item of laundry_basket) {
      const result2 = await db.queryAsync(query2, [
        orderID,
        item.type_ID,
        item.service_ID,
        item.total,
        item.quantity,
      ]);
      console.log(result2);
    }

    res.send({ message: "Order added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: err.message });
  }
});



router.get('/orders', async (req, res) => {
  let query = "SELECT * FROM orders";

  db.query(query, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "No orders found" });
      }
    }
  });
});



router.get('/pendingorders', async (req, res) => {
  try {
    let query = "SELECT * FROM orders WHERE order_status = 'Pending' LIMIT 10;";
    const result = await db.queryAsync(query);

    if (result.length > 0) {
      res.send(result);
    } 
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.get ('/recentorders', async(req,res)=>{
  let query = "SELECT * FROM orders WHERE order_status = 'Finished' LIMIT 10;"
  try {
    const result = await db.queryAsync(query);
    if (result.length > 0) {
      res.send(result);
    } 
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

//////////////////////////////////////////////////////TO CHANGE
router.put('/editorder/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { updatedData } = req.body;

    const updateOrderQuery =
      'UPDATE orders SET  order_total = ?, order_paidAmount = ?, order_status = ? WHERE order_ID = ?';

    db.query(
      updateOrderQuery,
      [
        updatedData.orderInfo,
        updatedData.order_total,
        updatedData.order_paidAmount,
        updatedData.storeName,
        updatedData.order_status,
        orderId,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send({ error: 'Internal Server Error' });
        } else {
          res.send(result);
>>>>>>> Stashed changes
        }
    
        await db.commitAsync();
    
        res.send({ message: "Data uploaded successfully" });
      } catch (error) {
        await db.rollbackAsync();
    
        res.status(500).send({ error: error.message });
      }
});

router.get('/totalorders',async (req,res)=>{
  let query="SELECT COUNT(*) as TotalOrders FROM orders";

  db.query(query,(err,result) => {
    if (err) {
        res.send({ err: err });
    } else {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "No ordersfound" });
        }
    }
});
});

router.get ('/orders', async (req,res)=>{
  let query = "SELECT * FROM orders"

  db.query(query,(err,result) => {
    if (err) {
        res.send({ err: err });
    } else {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "No orders found" });
        }
    }
});
});

// router.put('/editorder/:orderId', async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { updatedData } = req.body;

//     const updateOrderQuery =
//       'UPDATE orders SET  order_total = ?, order_paidAmount = ?, order_status = ? WHERE order_ID = ?';

//     db.query(
//       updateOrderQuery,
//       [
//         updatedData.orderInfo,
//         updatedData.order_total,
//         updatedData.order_paidAmount,
//         updatedData.storeName,
//         updatedData.order_status,
//         orderId,
//       ],
//       (err, result) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send({ error: 'Internal Server Error' });
//         } else {
//           res.send(result);
//         }
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });

router.delete('/deleteService/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Perform the deletion in your database
    const deleteServiceQuery = 'DELETE FROM services WHERE service_ID = ?';

    db.query(deleteServiceQuery, [serviceId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
      } else {
        res.send({ message: 'Service deleted successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// const db = require('../path/to/your/db-module');

// // Define the route for updating an order
// router.put('/order/editorder/:orderId', async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const updatedData = req.body;

//     // Update the order in the database
//     const updateOrderQuery = `
//       UPDATE orders
//       SET order_total = ?,
//           order_status = ?,
//           order_paidAmount = ?,
//           storeName = ?
//       WHERE order_ID = ?;
//     `;

//     db.query(
//       updateOrderQuery,
//       [
//         updatedData.order_total,
//         updatedData.order_status,
//         updatedData.order_paidAmount,
//         updatedData.storeName,
//         orderId,
//       ],
//       (err, result) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send({ error: 'Internal Server Error' });
//         } else {
//           res.status(200).send({ message: 'Order updated successfully' });
//         }
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });




<<<<<<< Updated upstream

=======
//////////////////////////////////////////////////////TO CHANGE
router.get('/priceList', async (req,res)=>{
  try{
    db.queryAsync("SELECT * FROM pricelist", (err, result) => {
      if (err) {
          res.send({ err: err });
      } else {
          if (result.length > 0) {
              res.send(result);
          } else {
              res.send({ message: "No pricelist found" });
          }
      }
  });
  }catch(err){
    res.status(500).send({ error: 'Internal Server Error' });
  }
>>>>>>> Stashed changes

});






module.exports = router;