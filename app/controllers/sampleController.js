const asyncHandler = require('express-async-handler')

const samples = [
    { id: 1, name: 'aaaaaaa', completed: false },
    { id: 2, name: 'bb', completed: false },
    { id: 3, name: 'ccccccccccc', completed: true }
]

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const readSamples = asyncHandler(async (req, res) => {
    console.log("hit readGoals")

    res.status(200).json(samples)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const createSample = asyncHandler(async (req, res) => {
    console.log('hit post samples')
    const { body } = req
    console.log({ body })

    if (typeof body.name !== 'string') {
        res.statusCode = 422
        throw new Error('name must string');
    }

    const newSample = {
        id: samples.length + 1,
        name: body.name,
        completed: false
    }

    samples.push(newSample)

    res.status(201).json(newSample);
})


// @desc    Read sample
// @route   DELETE /api/goals/:id
// @access  Private
const readSample = asyncHandler(async (req, res) => {
    const id = req.params.id
    const foundSample = samples.find((sample) => sample.id === Number(id))

    if (!foundSample) {
        res.statusCode = 404
        throw new Error('sample not found');
    }

    res.status(200).json(foundSample);
})

module.exports = {
    createSample,
    readSamples,
    readSample
}