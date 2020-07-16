import  React from 'react'
import { TariffCard } from '../TariffCard/TariffCard'
import './TariffCards.css'

export const TariffCards = (props) => { 
    const cards = props.allTariffs.map( (element, index)=> {
        return <TariffCard 
                    index={index}
                    key={index} 
                    provider={element['Провайдер']} 
                    tariffName={element['Название']} 
                    speed={element['Скорость']} 
                    price={element['Цена']} 
                />
    })  
    return( 
        <div id='TariffCards'>
            <h2>Тарифы доступные по вашему адресу</h2>
            {cards}
        </div> 
    )
}