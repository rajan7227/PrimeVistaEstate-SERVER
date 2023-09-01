const express = require('express');
const usercontroller = require("../controllers/user-controller.js")
const router = express.Router();

router.route('/signup').post(usercontroller.addUser)
router.route('/bookvisit/:id').post(usercontroller.booking)
router.route('/bookings').post(usercontroller.getAllBookings)
router.route('/cancelbooking/:id').post(usercontroller.cancelBookings)
router.route('/favorite/:pid').post(usercontroller.favoritePropperty)

module.exports = router;