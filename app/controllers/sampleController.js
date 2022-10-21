const asyncHandler = require('express-async-handler')

const { Sample } = require('../../db/models')

// @desc    Get samples
// @route   GET samples
// @access  Public
const readSamples = asyncHandler(async (req, res) => {
    const samples = await Sample.findAll()
    console.log("sample", JSON.stringify(samples, null, 2))

    const data = samples
    const msg = data.length !== 0 ? "Successfully read Samples" : "Successfully read Samples but empty"

    return res.status(200).json({ isSuccess: true, msg, data })
})

// @desc    Set sample
// @route   POST samples
// @access  Public
const createSample = asyncHandler(async (req, res) => {
    const body = req.body

    if (typeof body.name !== 'string') {
        res.statusCode = 422
        throw new Error('name must string');
    }

    const sample = await Sample.create(req.body)
    // console.log("sample", JSON.stringify(sample, null, 2))

    const data = sample
    const msg = "Successfully created Sample"

    return res.status(201).json({ isSuccess: true, msg, data })
})


// @desc    Read sample
// @route   DELETE samples/:id
// @access  Public
const readSample = asyncHandler(async (req, res) => {
    const id = req.params.id

    const foundSample = await Sample.findByPk(id)
    // console.log("foundSample", JSON.stringify(foundSample, null, 2))

    if (!foundSample) {
        res.statusCode = 404
        throw new Error('sample not found');
    }

    const data = foundSample
    const msg = data.length !== 0 ? "Successfully read Sample" : "Successfully read Sample but empty"

    return res.status(200).json({ isSuccess: true, msg, data })
})

module.exports = {
    createSample,
    readSamples,
    readSample
}