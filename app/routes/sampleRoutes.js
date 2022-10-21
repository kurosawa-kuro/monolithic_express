const express = require('express')
const router = express.Router()

const SampleController = require('../controllers/sampleController.js')

router.post('/', SampleController.createSample)
router.get('/', SampleController.readSamples)
router.get('/:id', SampleController.readSample)
// router.get('/:id', SampleController.updateSample)
// router.get('/:id', SampleController.deleteSample)
// router.get('/:id', SampleController.searchSamples)

module.exports = router