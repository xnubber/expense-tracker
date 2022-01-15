const express = require('express')
const router = express.Router()
const catchAsync = require('../../helpers/catchAsync')
const expense = require('../../controllers/expensesController')

// create
router.get('/new', expense.renderNewForm)
router.post('/', catchAsync(expense.createRecord))

// update
router.get('/:id/edit', catchAsync(expense.renderEditForm))
router.put('/:id', catchAsync(expense.editRecord))

// delete
router.delete('/:id', catchAsync(expense.deleteRecord))

module.exports = router