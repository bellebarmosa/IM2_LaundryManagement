const express = require("express");
const db = require("../models/db");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
/////////////////////////////////////////////////////////////////////////
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: 'Not authenticated' });
  }

  // const authToken=token && token.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    req.user = user; // Attach the user information to the request object
    next();
  });
};

/////////////////////////////////////////////////////////////////////////
router.get('/profile', verifyToken, (req, res) => {
  res.send({ user: req.user });
});

router.get('/employees', verifyToken ,async (req,res)=>{
   if(req.user.employee_role === "admin" || req.user.employee_role === "storeOwner"){  
    db.query("SELECT * FROM employees", (err, result) => {
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
  }else{
    res.send({ message: "Invalid Access" });
  }
})

router.put('/edit/:employeeID', async (req, res) => {
    try {
      const employeeID = req.params.employeeID;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.employee_password, salt);

      const updatedEmployee = {
        employee_name: req.body.employee_name,
        employee_eMail: req.body.employee_eMail,
        employee_phone: req.body.employee_phone,
        employee_role: req.body.employee_role,
        employee_password: hashedPassword,
      };
    
      //Update where employee_ID matches
      const updateEmployeeQuery = `
        UPDATE employees
        SET
          employee_name = ?,
          employee_phone = ?,
          employee_eMail = ?,
          employee_role = ?,
          employee_password = ?
        WHERE employee_ID = ?
      `;
  
      db.query(
        updateEmployeeQuery,
        [
          updatedEmployee.employee_name,
          updatedEmployee.employee_phone,
          updatedEmployee.employee_eMail,
          updatedEmployee.employee_role,
          updatedEmployee.employee_password,
          employeeID,
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

  //adds employees 
  router.post('/register', async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.employee_password, salt);
  
      const user = {
        employee_name: req.body.employee_name,
        employee_eMail: req.body.employee_eMail,
        employee_phone: req.body.employee_phone,
        employee_role: req.body.employee_role,
        employee_password: hashedPassword,
      };

      console.log(user)
  
      const insertIntoEmployee =
        "INSERT INTO employees(`employee_name`, `employee_phone`, `employee_eMail`, `employee_role`, `employee_password`) VALUES (?, ?, ?, ?, ?)";
  
      const result = await db.queryAsync(insertIntoEmployee, [
        user.employee_name,
        user.employee_phone,
        user.employee_eMail,
        user.employee_role,
        user.employee_password,
      ]);
  
      console.log('Database result:', result);
      res.send(result);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/delete/:employeeId', async (req, res) => {
    try {
      const { employeeId } = req.params;
  
      // Perform the delete operation in the database
      const deleteEmployeeQuery = 'DELETE FROM employees WHERE employee_ID = ?';
  
      const result = await db.queryAsync(deleteEmployeeQuery, [employeeId]);
  
      if (result.affectedRows === 0) {
        // If no rows were affected, the employee with the given ID was not found
        res.status(404).send({ error: 'Employee not found' });
      } else {
        res.status(200).send({ message: 'Employee deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // router.get('/profile', (req, res) => {
  //   const token = req.cookies.token;
  
  //   if (!token) {
  //     return res.status(401).send({ message: 'Not authenticated' });
  //   }
  
  //   jwt.verify(token, process.env_ACCESS_TOKEN_SECRET, (err, user) => {
  //     if (err) {
  //       return res.status(401).send({ message: 'Invalid token' });
  //     }
  
  //     res.send({ user });
  //   });
  // });  

  
router.post('/login', async (req, res) => {
  const { employee_eMail, employee_password } = req.body;

  db.queryAsync(
    'SELECT * FROM employees WHERE employee_eMail = ?',
    [employee_eMail],
    async (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        const isPasswordMatch = await bcrypt.compare(
          employee_password,
          result[0].employee_password
        );

        if (isPasswordMatch) {
          const user = {
            employee_ID: result[0].employee_ID,
            employee_name: result[0].employee_name,
            employee_role: result[0].employee_role,
            employee_eMail: result[0].employee_eMail,
            employee_phone: result[0].employee_phone,
            employee_password:result[0].employee_password
          };

          const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' }); 
          res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }); // Set cookie with token
          return res.send({ Auth: true, token});
        } else {
          res.send({ Auth: false, message: 'Invalid credentials' });
        }
      } else {
        res.send({ Auth: false, message: 'User not found' });
      }
    }
  );
});

router.get('/totalsales',async (req,res)=>{

    db.query("SELECT SUM(order_total) AS totalsales FROM `orders` " ,(err,result)=>{
        if (err) {
            res.send({ err: err });
        }else{
            res.send(result);
        }
    })
})

router.get('/customers')

module.exports = router;