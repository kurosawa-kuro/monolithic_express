const express = require('express')
const router = express.Router()

const SampleController = require('../controllers/sampleController.js')

console.log("__filename", __filename)
router.post('/', SampleController.createSample)
router.get('/', SampleController.readSamples)
router.get('/:id', SampleController.readSample)

module.exports = router