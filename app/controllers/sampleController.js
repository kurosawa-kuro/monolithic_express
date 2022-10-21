const { Op } = require("sequelize");
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator');

const { Sample } = require("../../db/models/")



// @desc    Display Create Form
// @route   GET /new
// @access  Public
const newAction = asyncHandler(async (req, res) => {
    res.render('samples/new');
})

// @desc    Create Sample
// @route   POST /samples
// @access  Public
const createAction = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const sample = await Sample.create(req.body)
    // console.log("sample", JSON.stringify(sample, null, 2))

    const msg = "Successfully created Sample"
    const data = sample

    res.redirect(req.baseUrl + '/');
})

// @desc    Index Samples
// @route   GET /samples
// @access  Public
const indexAction = asyncHandler(async (req, res) => {
    console.log("readSamples")
    const samples = await Sample.findAll({ raw: true })
    const rows = samples

    res.render('samples/index', { rows });
})

// @desc    Show sample
// @route   GET /samples/:id
// @access  Public
const showAction = asyncHandler(async (req, res) => {
    console.log("hit readSample")
    const sample = await Sample.findByPk(req.params.id, { raw: true })
    // console.log("JSON.stringify(sample, null, 2)", JSON.stringify(sample, null, 2))

    const msg = sample ? "Successfully found Samples" : "Successfully found Samples but empty"
    const row = sample

    console.log({ row })

    // return res.status(200).json({ isSuccess: true, msg, data })
    res.render('samples/view', { row });
})

// @desc    Display Edit Form
// @route   GET /edit
// @access  Public
const editAction = asyncHandler(async (req, res) => {
    const id = req.params.id

    const foundSampleWithId = await Sample.findByPk(id, { raw: true });
    // console.log({ foundSampleWithId })
    const row = foundSampleWithId
    console.log({ row })
    res.render('samples/edit', { row });
})

// @desc    Update sample
// @route   PUT /api/samples/:id
// @access  Public
const updateAction = asyncHandler(async (req, res) => {
    console.log("hit updateAction")
    const id = req.params.id
    console.log("req.body", req.body)

    const foundSampleWithId = await Sample.findByPk(id);
    // console.log({ foundSampleWithId })

    if (!foundSampleWithId) {
        res.statusCode = 404
        throw new Error('sample not found');
    }

    await Sample.update(req.body, {
        where: { id }
    });

    foundSampleWithId.name = req.body.name
    foundSampleWithId.role = req.body.role

    const msg = "Successfully updated Sample"
    const data = foundSampleWithId

    // return res.status(201).json({ isSuccess: true, msg, data })
    res.redirect(req.baseUrl + '/');
})

// @desc    Delete sample
// @route   DELETE samples/:id
// @access  Public
const deleteAction = asyncHandler(async (req, res) => {
    console.log("hit deleteAction")
    const id = req.params.id

    const foundSampleWithId = await Sample.findByPk(id);
    // console.log({ foundSampleWithId })

    if (!foundSampleWithId) {
        res.statusCode = 404
        throw new Error('sample not found');
    }

    await Sample.destroy({
        where: { id }
    });
    const msg = "Successfully deleted Sample"
    const data = foundSampleWithId

    res.redirect(req.baseUrl + '/');
})

// @desc    Search samples
// @route   GET /samples/search?keyword
// @access  Public
const searchSamples = asyncHandler(async (req, res) => {
    console.log("searchSamples")
    const { keyword } = req.query

    const samples = await Sample.findAll({
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: '%' + keyword + '%'
                    }
                }
            ]
        }
    })

    const data = samples
    const msg = samples.length === 0 ? "Successfully searched Samples but empty" : "Successfully searched Samples"

    return res.status(200).json({ isSuccess: true, msg, data })
})


module.exports = {
    newAction,
    createAction,
    indexAction,
    showAction,
    searchSamples,
    editAction,
    updateAction,
    deleteAction
}