const express = require('express');
const usercontroller = require("../controllers/user-controller.js")
const router = express.Router();

//signup
router.route('/signup').post(usercontroller.addUser)
//BOOK VISIT
router.route('/bookvisit/:id').post(usercontroller.booking)
//CHECK BOOKINGS
router.route('/bookings').post(usercontroller.getAllBookings)
//CANCEL BOOKINGS
router.route('/cancelbooking/:id').post(usercontroller.cancelBookings)
//ADD  TO FAVORITE
router.route('/tofavorite/:pid').post(usercontroller.favoritePropperty)
//all favorite
router.route('/favorite').get(usercontroller.allFavorite)

module.exports = router;