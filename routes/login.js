var express = require('express');
var router = express.Router();

router.get('/loginpage',function(req,res,next){
    res.render('loginpage')
})

module.exports = router;