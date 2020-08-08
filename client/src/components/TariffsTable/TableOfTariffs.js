import  React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import './TariffsTable.css'

export const TableOfTariffs = (props) => {

    const [allTariffs, setAllTariffs] = useState([])
    const [sortConfig, setSortConfig] = useState({
        column: '',
        direction: 1
    })

    useEffect( () => {
        setAllTariffs(props.allTariffs)
    }, [props.allTariffs])

    const symbolReplace = (string) => {
        if(string === 'Безлимит'){
            return <img id='infinitySymbol' src='http://localhost:3000/static/infinity_lighter.png' alt='infinitySymbol'/>
        } else if(string === 0 || string === 'нет'){
            return <div className='dash'><p style={{'display': 'none'}}>{string}</p></div> 
        }
        else return <div><p>{string}</p></div>
    }
    const optionTooltip = (option, price, symbol) => {
        if(price && option !== 'нет'){
            return (<div className='optionSymbol'>                        
                        {<i className={`fas fa-${symbol}`} style={{'color': '#DB2A2A'}}></i>}
                        <span className="tooltiptext">{option}{(price !== 'бесплатно')? ` за ${price} руб/мес`: ` бесплатно`}</span>
                    </div>)
        }else if(!price && option !== 'нет'){
            return (<div className='optionSymbol'>
                        <i className={`fas fa-${symbol}`} style={{'color': '#DB2A2A'}}></i>
                        <span className="tooltiptext">{option}</span>
                    </div>)
        }
         else return ( <div className='optionSymbol'>
                            <i className={`fas fa-${symbol}`}></i>
                        </div>)
    }

    //Создание таблицы
    const createTable = () => { 
        return allTariffs.map( (element, index) =>            
            <div key={element._id} id={`row${index + 1}`} className='row'>
                <div className='cell columnProvider'>{chooseProviderLogo(element['Провайдер'])}</div>
                <div className='cell columnName'><p>{element['Название']}</p></div>
                <div className='cell columnSpeed'><div><p>{element['Скорость']}</p></div><p>Мбит/с</p></div>
                <div className='cell columnChannels'>{symbolReplace(element['Каналы'])}<p>Каналов</p></div>
                <div className='cell columnMobile'>
                    <div>
                        {symbolReplace(element['Мобильный интернет'])}
                        <p>Гб</p>
                    </div>
                    <div>
                        {symbolReplace(element['Мобильная связь'])}
                        <p>мин</p>
                    </div>
                    <div>
                        {symbolReplace(element['СМС'])}
                        <p>смс</p>
                    </div>
                </div>
                <div className='cell columnOptions'>
                    {optionTooltip(element['Роутер'], element['Стоимость роутера'], 'wifi')}  
                    {optionTooltip(element['ТВ-приставка'], element['Стоимость ТВ-приставки'], 'tv')}
                    <i className="fas fa-info-circle"></i>{/*доп инфы и акций в бд пока нет*/}
                    <i className="fas fa-gift"></i>
                </div>
                <div className='cell columnPrice'>
                    <div>
                        <p>{element['Цена']}</p>
                        <p>руб/мес</p>
                    </div>
                    <Link to='/aboutTariff' onClick={() => chooseTariffHandler(element)}>
                        Выбрать
                    </ Link>
                </div>
            </div>
        )  
    }
    const chooseTariffHandler = (element) => {
        props.setDataForRequest({
            ...props.dataForRequest,
            tariff: element
        })
    }

    //Подстановка логотипа провайдера
    const chooseProviderLogo = (provider) => {
        if(provider === 'ДОМ.ru') return <img src='http://localhost:3000/static/DOMru2.png' alt={provider}></img>
        if(provider === 'Beeline') return <img src='http://localhost:3000/static/Beeline.png' alt={provider}></img>
        if(provider === 'МТС') return <img src='http://localhost:3000/static/mts.png' alt={provider}></img>
        if(provider === 'Ростелеком') return <img src='http://localhost:3000/static/Rostelecom.png' alt={provider}></img>
    }

    const mobileSort = (element) => {
        if (element === 'Безлимит') return 9999
        else if (element === 'нет') return 0
        else return +element
    }
    const optionSort = (element) => {
        if (element === 'нет') return 0
        else return 1
    }
    
    //Сортировка столбцов
    const sortingByСolumn = (column) => {
        let direction = 1
        if (
            sortConfig.column === column &&
            sortConfig.direction === 1
        ) {
            console.log('change')
            direction = -1
        }
        const newTariffs = allTariffs.sort( (a, b) => {
            if(column === 'columnMobile'){
                a = mobileSort(a['Мобильный интернет']) + mobileSort(a['Мобильная связь']) + mobileSort(a['СМС'])
                b = mobileSort(b['Мобильный интернет']) + mobileSort(b['Мобильная связь']) + mobileSort(b['СМС'])
            }else if(column === 'columnOptions'){
                a = optionSort(a['Роутер']) + optionSort(a['ТВ-приставка'])
                b = optionSort(b['Роутер']) + optionSort(b['ТВ-приставка'])
            } else {
                a = a[column]
                b = b[column]
            }
            if (a > b) {
                return -1 * direction
            }
            else if (a < b) {
                return 1 * direction
            } else return 0 
        }) 
        setSortConfig({
            column,
            direction
        })
        setAllTariffs(newTariffs)
    }
    //<i class="fas fa-infinity"></i>
    return( 
        <div id='tariffsForAddress'>            
            <div className='table'>
                <div  id='row0' className='row'>
                    <div className='cell columnProvider'><button onClick={() =>sortingByСolumn('Провайдер')}>Провайдер</button></div>
                    <div className='cell columnName'><button onClick={() =>sortingByСolumn('Название')}>Тариф</button></div>
                    <div className='cell columnSpeed'><button onClick={() =>sortingByСolumn('Скорость')}>Скорость</button></div>
                    <div className='cell columnChannels'><button onClick={() =>sortingByСolumn('Каналы')}>Каналы</button></div>
                    <div className='cell columnMobile'><button onClick={() =>sortingByСolumn('columnMobile')}>Моб. связь</button></div>
                    <div className='cell columnOptions'><button onClick={() =>sortingByСolumn('columnOptions')}>Опции</button></div>
                    <div className='cell columnPrice'><button onClick={() =>sortingByСolumn('Цена')}>Стоимость</button></div>  
                </div>           
                {createTable()}
            </div>
        </div>
    )
}