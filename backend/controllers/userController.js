const express = require("express");
const db = require("../models/db");
const bcrypt = require("bcrypt");
const router = express.Router();



router.get('/profile', (req, res) => {
   
    if (req.session.user){
        res.send({user: req.session.user});
    }else{
        res.status(401).json({ message: 'Not authenticated' });
    }
});

router.get('/employees', async (req,res)=>{
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

router.get("/login", (req, res) => {
    
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
});

router.post("/login", async (req, res) => {
    const employee_eMail = req.body.employee_eMail;
    const employee_password = req.body.employee_password;

    db.query(
        "SELECT * FROM employees WHERE employee_eMail = ?",
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

                console.log(result[0])
                console.log(isPasswordMatch)
                console.log(employee_password)

                if (isPasswordMatch) {
                    req.session.user = result;
                    return res.send(result);
                } else {
                    res.send({ message: "DID NOT COMPARE" });
                }
            } else {
                res.send({ message: "Wrong user/password2" });
            }
        }
    );
});


router.get('/totalsales', async (req,res)=>{

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