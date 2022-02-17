const router = require("express").Router();
const User = require("../models/User.model")
const isLoggedIn = require("../middleware/isLoggedIn")


router.get("/profile/:id",isLoggedIn,(req, res)=>{
  const id = req.session.user
  User.findById(id)
    .then((user)=>{
      res.render("user/user-profile", user)
      console.log(user)
    })
  
})

/* GET home page */
router.get("/", (req, res, next) => {
 
  res.render("index");
});

module.exports = router;
