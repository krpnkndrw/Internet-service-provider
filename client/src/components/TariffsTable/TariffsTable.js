import  React, {useState, useEffect} from 'react';
import { TableOfTariffs } from './TableOfTariffs'
import './TariffsTable.css'

export const TariffsTable = (props) => {

    const [tariffs, setTariffs] = useState(props.listOfTariffs)

    useEffect( () => {
        let newTariffs = props.listOfTariffs.filter( element => {
            return props.dataForRequest.house['Провайдер'].includes( element['Провайдер'] )
        })
        setTariffs(newTariffs) 
        console.log('фильтр тарифов')
    }, [props.dataForRequest.house, props.listOfTariffs] )
    

    useEffect( () => {
        //Почему-то требуется задержка хотя пустой юсЕфект должен работать сразу
        setTimeout( () => {
            window.scrollTo({
                top: document.getElementById('tariffsForAddress').offsetTop,
                behavior:"smooth"
            })
        }, 100 )
    }, [])

    return( 
        <div>
            <TableOfTariffs 
                listOfTariffs={tariffs}
                setDataForRequest={props.setDataForRequest} 
                dataForRequest={props.dataForRequest} 
            />
        </div> 
    )
}