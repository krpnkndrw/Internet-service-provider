const xlsx = require('xlsx')
const House = require('./models/House')
const ListOfAddresses = require('./models/ListOfAddresses')
const Tariff = require('./models/Tariff')

const updateAddresses = () => {

    ///Все данные по домам 

    //Загрузка данных из Excel
    const beelineAddreses = loadAddresses('./data/beeline.xlsx')
    const mtsAddreses = loadAddresses('./data/mts.xlsx')
    const rostelekomAddreses = loadAddresses('./data/roskelekom.xlsx')
    const domru = loadAddresses('./data/domru.xlsx')

    const beelineAddresesStr = JSON.stringify(beelineAddreses);
    const mtsAddresesStr = JSON.stringify(mtsAddreses);
    const rostelekomAddresesStr = JSON.stringify(rostelekomAddreses);
    const domruStr = JSON.stringify(domru);

    const allAddreses = beelineAddreses.concat(mtsAddreses).concat(rostelekomAddreses).concat(domru)

    const allAddresesяUniqueWithProviders = [ ...new Set(allAddreses.map( element => element['Единый идентификатор дома'] )) ] //Фильтр повторов
        .map(id => allAddreses.find( elem => elem['Единый идентификатор дома'] === id )) 
        .map( element => { //Добавление пункта о провайдерах этого дома
            let providers = []
            if( beelineAddresesStr.includes(JSON.stringify(element)) ){
                providers.push('Beeline')
            }
            if( mtsAddresesStr.includes(JSON.stringify(element)) ){
                providers.push('МТС')
            }
            if( rostelekomAddresesStr.includes(JSON.stringify(element)) ){
                providers.push('Ростелеком')
            }
            if( domruStr.includes(JSON.stringify(element)) ){
                providers.push('ДОМ.ru')
            }
            return {
                ...element,
                'Провайдер': providers
            }            
    })
    //Обновление данных в бд
    deleteAll(House)
    allAddresesяUniqueWithProviders.forEach( element => House(element).save() )
    
    console.log('Адресса обновлены') //строка выполняется до заверншения обновления всех адресов
    
    ///Список всех адресов
    const listOfAddresses = allAddresesяUniqueWithProviders.map( element => element['Адрес'].slice(6) )
    deleteAll(ListOfAddresses)
    new ListOfAddresses( {list:listOfAddresses} ).save()

    console.log('Список адресов обовлен') //строка выполняется до заверншения обновления всех адресов

    //Все данные по тарифам    
    const tariffs = loadFromXlxs('./data/tariffs.xlsx')
    deleteAll(Tariff)
    tariffs.forEach( element => new Tariff(element).save() )

    console.log('Тарифы обовлены') //строка выполняется до заверншения обновления всех адресов
}
//Ф-я очистки бд по модели
const deleteAll = (model) => {
    model.deleteMany({},
        (err) => {
            if (err) return handleError(err)
        }
    )
}
//Ф-я загрузки из Excel
const loadFromXlxs = (pathToXlsx) => {
    const workBook = xlsx.readFile(pathToXlsx)
    const sheet_name_list = workBook.SheetNames
    return xlsx.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]])  
}
//Ф-я обрадотки данных о домах
const loadAddresses = (pathToXlsx) => {
    //const providerName = pathToXlsx.slice(7, -5)
    //console.log(`Загрузка ${providerName} из таблицы`)

    const xlsxData = loadFromXlxs(pathToXlsx)

    const newXlsxData = xlsxData.map( element => {
        const newElement = {
            'Населенный пункт': element['Нас.пункт'],
            'Обслуживающая организация': element['Обслуж. организация'],
            'Провайдер': [],
             ...element
        }
        delete(newElement['Нас.пункт'])
        delete(newElement['Обслуж. организация'])
        return newElement
    })
    return newXlsxData
}

module.exports = updateAddresses
