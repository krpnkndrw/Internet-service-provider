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
                    provider={element['Провайдер']} 
                    tariffName={element['Название']} 
                    speed={element['Скорость']} 
                    price={element['Цена']} 
                    channels={element['Каналы']}
                    mobileEnternet={element['Мобильный интернет']}
                    mobileCalls={element['Мобильная связь']}                 
                />
    })  
    return( 
        <div id='TariffCards'>            
            {cards}
        </div> 
    )
}