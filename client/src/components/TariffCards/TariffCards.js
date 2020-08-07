import  React, { useEffect } from 'react'
import { TariffCard } from '../TariffCard/TariffCard'
import './TariffCards.css'

export const TariffCards = (props) => { 
    /*
    useEffect( () => {
        forceUpdate()
    }, [props.allTariffs])
*/
    const cards = props.allTariffs.map( (element, index)=> {
        return <TariffCard 
                    index={index}
                    key={index} 
                    tariff={element}
                    dataForRequest={props.dataForRequest}
                    setDataForRequest={props.setDataForRequest}               
                />
    })  
    return( 
        <div id='TariffCards'>            
            {cards}
        </div> 
    )
}