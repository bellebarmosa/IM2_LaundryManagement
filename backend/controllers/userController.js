const express = require("express");
const db = require("../models/db");

const router = express.Router();

router.get('/profile', (req, res) => {
   
    if (req.session.user){
        res.send({user: req.session.user});
    }else{
        res.status(401).json({ message: 'Not authenticated' });
    }
});

router.get("/login", (req, res) => {
    
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
});

router.post("/login", (req, res) => {
    //ill change it to JWT later
    const employee_eMail = req.body.employee_eMail;
    const employee_password = req.body.employee_password;

    db.query(
        "SELECT * FROM employees WHERE employee_eMail = ? AND employee_password = ?",
        [employee_eMail,employee_password],
        (err,result)=>{
            if(err){
                 res.send({err:err})
            }

            if(result.length > 0){
                req.session.user = result;
                //console.log(req.session.user);
               return res.json(result);
            }else{
                res.send({message:"Wrong user/password"});
        }
    })
});

module.exports = router;