const express = require('express')
const router = express.Router()

const DummyController = require('../controllers/dummyController.js')

router.post('/', DummyController.createDummy)
router.get('/', DummyController.readDummies)
router.get('/:id', DummyController.readDummy)

module.exports = router