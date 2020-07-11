const mongoose = require('mongoose')
let tariff = new mongoose.Schema({
    'Провайдер': {type: String},
    'Название':  {type: String},
    'Скорость':  {type: String},
    'Цена':      {type: String}
})
module.exports = mongoose.model('Tariff', tariff)