import  React, {useState, useEffect} from 'react'
import { chooseProviderLogo } from '../chooseProviderLogo'
import './AllTariffs.css'

export const AllTariffs = (props) => {

    const [crntTariffs, setCrntTariffs] = useState(props.listOfTariffs)
    const [tableOfTariffs, setTableOfTariffs] = useState([])

    const [sort, setSort] = useState({
        direction: 1
    })
    
    useEffect( () => {
        createTable()
    }, [crntTariffs])
    
    const createTable = () => {    
        let tableOfTariffs = crntTariffs.map( (element, index) =>
            <div key={element._id} id={`row${index + 1}`} className='row'>
                <div className='cell columnProvider'>{chooseProviderLogo(element['Провайдер'])}</div>
                <div className='cell columnName'><p>{element['Название']}</p></div>
                <div className='cell columnSpeed'><p>{element['Скорость']}</p></div>
                <div className='cell columnPrice'><p>{element['Цена']}</p> <button onClick={() => {
                    props.setDataForRequest({
                        ...props.dataForRequest,
                        tariff: element
                    })
                }}>Выбрать</button></div>
            </div>
        )  
        setTableOfTariffs(tableOfTariffs)  
    }

    const sortingByСolumn = (column) => {
        const newCurrentTariffs = crntTariffs.sort( (a, b) => {
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
            if(a === b){
                return 0
            }   
        }) 
        setSort({
            direction: sort.direction*(-1)
        })
        setCrntTariffs(newCurrentTariffs)
        createTable()
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
                {tableOfTariffs}
            </div>
        </div> 
    )
}