const express = require('express');
const router = express.Router();
//Homepage
router.get('/', (req, res) => {
    res.render('homepage')
})
//Route for login
router.get('/login',(req,res)=> {
    res.render('oauth/login');
})

module.exports = router;