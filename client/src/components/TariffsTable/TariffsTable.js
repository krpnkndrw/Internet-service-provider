import  React, {useState, useEffect} from 'react';
import { TableOfTariffs } from './TableOfTariffs'
import './TariffsTable.css'

export const TariffsTable = (props) => {

    const [tariffs, setTariffs] = useState(props.allTariffs)

    useEffect( () => {
        let newTariffs = props.allTariffs.filter( element => {
            return props.dataForRequest.house['Провайдер'].includes( element['Провайдер'] )
        })
        setTariffs(newTariffs) 
    }, [props.dataForRequest.house, props.allTariffs] )
    

    /*useEffect( () => {
        //Почему-то требуется задержка хотя пустой юсЕфект должен работать сразу
        setTimeout( () => {
            window.scrollTo({
                top: document.getElementById('tariffsForAddress').offsetTop,
                behavior:"smooth"
            })
        }, 100 )
    }, [])*/

    return( 
        <div>
            <TableOfTariffs 
                allTariffs={tariffs}
                setDataForRequest={props.setDataForRequest} 
                dataForRequest={props.dataForRequest} 
            />
        </div> 
    )
}