import  React from 'react'
import './TariffCard.css'

export const TariffCard = (props) => { 
    const {provider, tariffName, speed, price} = props   

    const chooseProviderLogo = (provider) => {
        if(provider === 'ДОМ.ru') return <img src='http://localhost:3000/static/DOMru2.png' alt={provider}></img>
        if(provider === 'Beeline') return <img src='http://localhost:3000/static/Beeline.png' alt={provider}></img>
        if(provider === 'МТС') return <img src='http://localhost:3000/static/mts.png' alt={provider}></img>
        if(provider === 'Ростелеком') return <img src='http://localhost:3000/static/Rostelecom.png' alt={provider}></img>
    }
    return( 
        <div id='TariffCard' style={{animation: `0.8s cubic-bezier(0.895, 0.03, 0.685, 0.22) ${0.2*props.index}s forwards appereance`}}>
            <div>
                <p>{tariffName}</p>
                {chooseProviderLogo(provider)}
            </div>
            <div>
                <div>
                    <p>Скорость</p>
                    <p>{speed}</p>
                </div>
                <div>
                    <p>Цена</p>
                    <p>{price}</p>
                </div>
            </div>
            <div>
                <button>Подключить</button>
            </div>
        </div> 
    )
}