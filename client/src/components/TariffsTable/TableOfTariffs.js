import  React, {useState, useEffect} from 'react';
import './TariffsTable.css'

export const TableOfTariffs = (props) => {

    const [allTariffs, setAllTariffs] = useState(props.allTariffs)
    const [sort, setSort] = useState({
        direction: 1
    })

    useEffect( () => {
        setAllTariffs(props.allTariffs)
    }, [props.allTariffs])

    //Создание таблицы
    const createTable = () => { 
        return allTariffs.map( (element, index) =>
            <div key={element._id} id={`row${index + 1}`} className='row'>
                <div className='cell columnProvider'>{chooseProviderLogo(element['Провайдер'])}</div>
                <div className='cell columnName'><p>{element['Название']}</p></div>
                <div className='cell columnSpeed'><p>{element['Скорость']}</p></div>
                <div className='cell columnPrice'><p>{element['Цена']}</p> 
                    {props.showButton && <button onClick={
                        () => {
                            props.setDataForRequest({
                                ...props.dataForRequest,
                                tariff: element
                            })
                        }}>Выбрать
                    </button>}
                </div>
            </div>
        )  
    }

    //Подстановка логотипа провайдера
    const chooseProviderLogo = (provider) => {
        if(provider === 'ДОМ.ru') return <img src='http://localhost:3000/static/DOMru2.png' alt={provider}></img>
        if(provider === 'Beeline') return <img src='http://localhost:3000/static/Beeline.png' alt={provider}></img>
        if(provider === 'МТС') return <img src='http://localhost:3000/static/mts.png' alt={provider}></img>
        if(provider === 'Ростелеком') return <img src='http://localhost:3000/static/Rostelecom.png' alt={provider}></img>
    }
    
    //Сортировка столбцов
    const sortingByСolumn = (column) => {
        const newTariffs = allTariffs.sort( (a, b) => {
            if(column === 'Скорость' || column === 'Цена'){
                a = +a[column].split(' ')[0]
                b = +b[column].split(' ')[0]
            } else if(column === 'Провайдер' || column === 'Название'){
                a = a[column]
                b = b[column]
            }
            if (a > b) {
                 return -1 * sort.direction
            }
            if (a < b) {
                return 1 * sort.direction
            }
            //if(a === b){
                return 0
            //}   
        }) 
        setSort({
            direction: sort.direction*(-1)
        })
        setAllTariffs(newTariffs)
        //createTable()
    }

    return( 
        <div id='tariffsForAddress'>
            <h2>Выберите тариф</h2>
            <div className='table'>
                <div  id='row0' className='row'>
                <div className='cell columnProvider'><button onClick={() =>sortingByСolumn('Провайдер')}>Провайдер</button></div>
                    <div className='cell columnName'><button onClick={() =>sortingByСolumn('Название')}>Тариф</button></div>
                    <div className='cell columnSpeed'><button onClick={() =>sortingByСolumn('Скорость')}>Скорость</button></div>
                    <div className='cell columnPrice'><button onClick={() =>sortingByСolumn('Цена')}>Цена</button></div>  
                </div>           
                {createTable()}
            </div>
        </div> 
    )
}