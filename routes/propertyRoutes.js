const express = require('express');
const { createProperty } = require('../controllers/property-controller');
const router = express.Router();

router.post("/create", createProperty)

module.exports = router