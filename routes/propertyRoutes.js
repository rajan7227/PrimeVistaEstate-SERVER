const express = require('express');
const { createProperty, getAllProperty, singleProperty } = require('../controllers/property-controller');
const router = express.Router();

router.post("/create", createProperty)
router.get("/:id", singleProperty)
router.get("/", getAllProperty)

module.exports = router