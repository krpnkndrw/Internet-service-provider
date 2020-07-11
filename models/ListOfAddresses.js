const mongoose = require('mongoose')
let listOfAddresses = new mongoose.Schema({
    list: {type: Array}
})
module.exports = mongoose.model('ListOfAddresses', listOfAddresses)