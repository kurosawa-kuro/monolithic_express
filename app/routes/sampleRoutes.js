const express = require('express')
const router = express.Router()

const sampleController = require('../controllers/sampleController.js')

router.get('/new', sampleController.newSample)
router.delete('/:id', sampleController.deleteSample)
router.post('/', sampleController.createSample)
router.get('/', sampleController.indexSamples)
router.get('/:id', sampleController.showSample)
router.get('/edit/:id', sampleController.editSample)
router.put('/:id', sampleController.updateSample)

router.get('/search/:keyword', sampleController.searchSamples)

module.exports = router