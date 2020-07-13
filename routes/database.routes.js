const InternetRequest = require('../models/InternetRequest')
const ListOfAddresses = require('../models/ListOfAddresses')
const Tariff = require('../models/Tariff')
const House = require('../models/House')
let { Router } = require('express')
const router = Router()

// /api/database/newinternetrequest
router.post('/newinternetrequest', (req, res) => {
    let currentDate = new Date();
    let newInternetRequest = new InternetRequest({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        tariff: req.body.tariff,
        dateOfRequest: currentDate,
        done: req.body.done,
        house: req.body.house
    })
    console.log(currentDate)
    newInternetRequest.save()
    res.send('Заявка успешно создана')
})

// /api/database/listOfAddresses
router.get('/listOfAllAddresses', async(req, res) => {
    const listOfAddresses = await ListOfAddresses.find({})
    res.send(listOfAddresses)
})
// /api/database/tariffs
router.get('/tariffs', async(req, res) => {
    const tariffs = await Tariff.find({})
    res.send(tariffs)
})
// /api/database/alldonerequests
router.get('/alldonerequests', async(req, res) => {
    const allrequests = await InternetRequest.find({ done: true })
    res.send(allrequests)
})
// /api/database/allnotdonerequests
router.get('/allnotdonerequests', async(req, res) => {
    const allrequests = await InternetRequest.find({ done: false })
    res.send(allrequests)
})
// /api/database/deleterequest
router.post('/deleterequest', async(req, res) => {
    console.log(req.body)
    const allrequests = await InternetRequest.remove({ _id: req.body.id })
    res.send(allrequests)
})
// /api/database/updaterequest
router.post('/updaterequest', async(req, res) => {
    const id = req.body.id
    console.log(req.body)
    const updatedRequest = await InternetRequest.findOneAndUpdate({_id: id}, req.body.update)
    res.send(updatedRequest)
})
// /api/database/houseinfo
router.post('/houseinfo', async(req, res) => {
    const houseInfo = await House.find({ 'Адрес': req.body.address})
    res.send(houseInfo)
})

module.exports = router