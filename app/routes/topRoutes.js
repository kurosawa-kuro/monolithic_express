const express = require('express')
const router = express.Router()

const topController = require('../controllers/topController.js')

// R
router.get('/', topController.indexAction)

module.exports = router