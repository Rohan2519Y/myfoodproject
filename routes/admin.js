var express = require('express');
const pool = require('./pool');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
/* GET home page. */
router.get('/dashboard', function (req, res, next) {
  try {
    var admin = localStorage.getItem("ADMIN")
    if (!admin) { res.render('loginpage', { message: '' }) }
    else {
      res.render('dashboard', { data: JSON.parse(admin) });
    }
  }
  catch (e) {
    res.render('loginpage', { message: '' })
  }
});

router.get('/loginpage', function (req, res, next) {
  res.render('loginpage', { message: '' })
})

router.post("/chk_admin_login", function (req, res, next) {
  pool.query("select * from admins where (emailid=?  or mobileno=?) and password=?", [req.body.emailid, req.body.emailid, req.body.password], function (error, result) {
    if (error) {
      res.render("loginpage", { message: "Error:Pls Contact to Database Administrator...", status: false })
    }
    else {
      if (result.length == 1) {
        localStorage.setItem("ADMIN", JSON.stringify(result[0]));
        res.render("dashboard", { data: result[0], message: "Success", status: true })
      }
      else
        res.render("loginpage", { data: [], message: "Invalid Emailid/Mobileno Password", status: false })
    }
  })
})
router.get('/logout', function (req, res, next) {
  localStorage.clear()
  res.render('loginpage', { message: '' })
})
module.exports = router;
