const mongoose = require('mongoose')
let tariff = new mongoose.Schema({
    'Провайдер':                {type: String},
    'Название':                 {type: String},
    'Скорость':                 {type: Number},
    'Цена':                     {type: Number},
    'Стоимость подключения':    {type: Number},
    'Роутер':                   {type: String},
    'Стоимость роутера':        {type: Number},
    'Каналы':                   {type: String},
    'ТВ-приставка':             {type: String},
    'Стоимость ТВ-приставки':   {type: Number},
    'Мобильный интернет':       {type: String},
    'Мобильная связь':          {type: String},
    'СМС':                      {type: String},

})
module.exports = mongoose.model('Tariff', tariff)