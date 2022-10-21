const { Op } = require("sequelize");
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator');

const { Sample } = require("../../db/models")

// @desc    Index Samples
// @route   GET /samples
// @access  Public
const indexAction = asyncHandler(async (req, res) => {
    console.log("readSamples")
    const samples = await Sample.findAll({ raw: true })
    const rows = samples

    res.render('tops/index', { rows });
})



module.exports = {
    indexAction
}