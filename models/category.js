const mongoose = require('mongoose')
const Schema = mongoose.Schema


const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  },
  icon: {
    type: String
  }

}) 

const Category = mongoose.model('Category', categorySchema)
module.exports = Category