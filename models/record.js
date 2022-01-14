const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   index: true,
  //   required: true
  // }
})

const Record = mongoose.model('Record', recordSchema)
module.exports = Record