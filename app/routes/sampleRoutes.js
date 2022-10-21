const express = require('express')
const router = express.Router()

const sampleController = require('../controllers/sampleController.js')

// C
router.get('/new', sampleController.newAction)
router.post('/', sampleController.createAction)

// R
router.get('/', sampleController.indexAction)
router.get('/:id', sampleController.showAction)

// U
router.get('/edit/:id', sampleController.editAction)
router.put('/:id', sampleController.updateAction)

// D
router.delete('/:id', sampleController.deleteAction)






// router.get('/search/:keyword', sampleController.search)

module.exports = router