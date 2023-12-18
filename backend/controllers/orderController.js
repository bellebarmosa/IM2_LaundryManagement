
const express = require("express");
const db = require("../models/db");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken"); // Import the middleware
/////////////////////////////////////////////////////////////////////////
//ADDD VERIFICATIONNNNNNN
/////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////WORKS
router.post('/services',async (req,res)=>{
    try{
        let addService = "INSERT INTO `services`(`service_name`, `serviceBase_Price`) VALUES (?,?)";
        const service_name= req.body.service_name;
        const serviceBase_Price = req.body.serviceBase_Price;

        db.query(addService,
            [service_name,serviceBase_Price],
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
//////////////////////////////////////////////////////WORKS
    router.put('/editservice/:serviceId', async (req, res) => {
      try {
        // Extract parameters from the request
        const { serviceId } = req.params;
        const updatedService = req.body;
    
        // Update the service in the database
        const updateServiceQuery = `UPDATE services SET service_name= ?,serviceBase_Price=? WHERE 1`;
    
        db.query(
          updateServiceQuery,
          [
            updatedService.service_name,
            updatedService.serviceBase_Price,
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




//////////////////////////////////////////////////////IT SHOULD WORK?
    router.put('/editorder/:orderId', async (req, res) => {
      try {
        const { orderId } = req.params;
        const { updatedData } = req.body;
    
        const updateOrderQuery =
          'INSERT INTO `orders`(`customer_ID`, `employee_ID`, `order_status`,`orderpickup_date`, `order_total`, `payment_status`, `Remarks`)VALUES (?,?,?,?,?,?,?)';
    
        db.query(
          updateOrderQuery,
          [
            updatedData.customer_ID,
            updatedData.employee_ID,
            updatedData.order_status,
            updatedData.orderpickup_date,
            updatedData.order_total,
            updatedData.payment_status,
            updatedData.Remarks,
      
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



router.get("/clothetype",async (req, res) => {
  try{
    db.queryAsync("SELECT * FROM clothetype", (err, result) => {
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

  }catch(err){
    res.send({err:err});
  }
  
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

//////////////////////////////////////////////////////TO CHANGE
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

//////////////////////////////////////////////////////TO CHANGE
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


//////////////////////////////////////////////////////TO CHANGE
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

//////////////////////////////////////////////////////TO CHANGE
router.post("/addOrder", async (req, res) => {
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
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

//////////////////////////////////////////////////////TO CHANGE
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

});






module.exports = router;