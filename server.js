const express = require('express')
const mongoose = require('mongoose')
const updateAddresses = require('./updateAddresses')

const PORT = 5000;
const mondoUrl = "mongodb+srv://kuper781:de4781@cluster0-ehtxm.azure.mongodb.net/app?retryWrites=true&w=majority";

const app = express()

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use('/api/database', require('./routes/database.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/static', express.static('./client/public'));

const start = async() => {
  try{
    console.log('Started..')
    await mongoose.connect(mondoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB...')
    //updateAddresses()
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))    
  } catch(e){
    console.log('Server error')
  }
}
start()







