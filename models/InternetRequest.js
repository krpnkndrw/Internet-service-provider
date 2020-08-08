const mongoose = require('mongoose')

let internetRequestShema = new mongoose.Schema({
    name:           {type: String, required: false},
    phone:          {type: String, required: false},
    email:          {type: String, required: false},
    address:        {type: String, required: false},
    house:          {type: Object, required: false},
    tariff:         {type: Object, required: false},
    options:        {type: Object, required: false},
    dateOfRequest:  {type: Date,   required: false},
    done:           {type: Boolean,required: false},
    dateOfDone:     {type: Date,   required: false},
})
module.exports = mongoose.model('InternetRequest', internetRequestShema)
