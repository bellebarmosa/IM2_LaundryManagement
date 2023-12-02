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

router.post('/register', async (req, res) => {
  
    try {
        console.log("here")
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = {
            employee_name: req.body.name,
            employee_eMail: req.body.email,
            employee_phone: req.body.phone,
            employee_role: req.body.role,
            employee_password: hashedPassword
        }
        console.log("here")

        const insertIntoEmployee =
        "INSERT INTO `employees`(`employee_name`, `employee_phone`, `employee_eMail`, `employee_role`, `employee_password`) VALUES (?, ?, ?, ?, ?)";

        db.query(insertIntoEmployee,
            [
                user.employee_name,
                user.employee_phone,
                user.employee_eMail,
                user.employee_role,
                user.employee_password
            ],
            (err, result) => {
                if (err) {
                    console.error(err);  // Log the error for debugging
                    res.status(500).send({ error: 'Internal Server Error' });
                } else {
                    res.send(result);
                }
            })
    } catch {
       
        res.status(500).send({ error: "HELP"});
        
    }
})


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

module.exports = router;