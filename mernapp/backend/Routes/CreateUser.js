const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret ="MynameisAnshulsobewareiam@loin12";



router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    // paswword must be at leat 5 chars long
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


// Hashing and Encryption Algorithm     
const salt=await bcrypt.genSalt(10);
const secPassword=await bcrypt.hash(req.body.password,salt);



    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true })); // then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",

  [
    body("email").isEmail(),

    // paswword must be at leat 5 chars long
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try login with correct credentials" });
      }

 // Comparing dbase password with login password using bcrypt
const pwdCompare=await bcrypt.compare(req.body.password,userData.password);
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try login with correct credentials" });
      }


 // Jwt Token Data     
const data={
  user:{
    id:userData.id
  }
}
// Adding Jwt Token signature
const authtoken=jwt.sign(data,jwtSecret);   // You can also give expire time of token as a third argument


      return res.json({ success: true,authtoken:authtoken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
