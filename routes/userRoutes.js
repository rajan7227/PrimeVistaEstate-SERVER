const express = require('express');
const usercontroller = require("../controllers/user-controller.js")
const propertycontroller = require("../controllers/property-controller.js")
const router = express.Router();

router.route('/signup').post(usercontroller.addUser)

module.exports = router;