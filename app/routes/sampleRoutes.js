const express = require('express')
const router = express.Router()

const SampleController = require('../controllers/sampleController.js')

router.get('/new', SampleController.newSample)
router.post('/', SampleController.createSample)
router.get('/', SampleController.readSamples)
router.get('/:id', SampleController.readSample)
router.get('/edit/:id', SampleController.editSample)
router.put('/:id', SampleController.updateSample)
router.delete('/:id', SampleController.deleteSample)
router.get('/search/:keyword', SampleController.searchSamples)

module.exports = router