const express = require('express');
const usercontroller = require("../controllers/user-controller.js")
const router = express.Router();

router.route('/signup').post(usercontroller.addUser)
router.route('/bookvisit/:id').post(usercontroller.booking)
router.route('/bookings').post(usercontroller.getAllBookings)

module.exports = router;