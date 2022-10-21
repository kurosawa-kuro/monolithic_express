const express = require('express')
const router = express.Router()

const sampleController = require('../controllers/sampleController.js')

// C
router.get('/new', sampleController.newSample)
router.post('/', sampleController.createSample)

// R
router.get('/', sampleController.indexSamples)
router.get('/:id', sampleController.showSample)
// U
router.get('/edit/:id', sampleController.editSample)
router.put('/:id', sampleController.updateSample)

// D
router.delete('/:id', sampleController.deleteSample)






// router.get('/search/:keyword', sampleController.search)

module.exports = router