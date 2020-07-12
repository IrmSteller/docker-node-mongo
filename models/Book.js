const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

module.exports = Book = mongoose.model('book', BookSchema);