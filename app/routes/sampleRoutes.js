const express = require('express')
const router = express.Router()

const SampleController = require('../controllers/sampleController.js')

router.get('/new', SampleController.newSample)
router.delete('/:id', SampleController.deleteSample)
router.post('/', SampleController.createSample)
router.get('/', SampleController.indexSamples)
router.get('/:id', SampleController.showSample)
router.get('/edit/:id', SampleController.editSample)
router.put('/:id', SampleController.updateSample)

router.get('/search/:keyword', SampleController.searchSamples)

module.exports = router