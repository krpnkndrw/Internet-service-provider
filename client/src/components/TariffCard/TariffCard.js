import React from 'react'
import { Link } from 'react-router-dom'
import './TariffCard.css'

export const TariffCard = (props) => { 

    const provider = props.tariff['Провайдер']
    const tariffName = props.tariff['Название']
    const speed = props.tariff['Скорость']
    const price = props.tariff['Цена']
    const channels = props.tariff['Каналы']
    const mobileEnternet = props.tariff['Мобильный интернет']
    const mobileCalls = props.tariff['Мобильная связь']

    const chooseProviderLogo = (provider) => {
        if(provider === 'ДОМ.ru') return <img src='http://localhost:3000/static/DOMru3.png' alt={provider}></img>
        if(provider === 'Beeline') return <img src='http://localhost:3000/static/Beeline.png' alt={provider}></img>
        if(provider === 'МТС') return <img src='http://localhost:3000/static/mts.png' alt={provider}></img>
        if(provider === 'Ростелеком') return <img src='http://localhost:3000/static/Rostelecom.png' alt={provider}></img>
    }
    //<div id='TariffCard' /*style={{animation: `0.8s cubic-bezier(0.895, 0.03, 0.685, 0.22) ${0.2*props.index}s forwards appereance`}}*/>

    
    const channelPostfix = (channels) => {
        let lastNumber = `${channels}`.slice(-1);
        console.log(lastNumber)
        if(lastNumber === '1') {
            return 'канал'
        }
        else if(lastNumber === '2' || lastNumber === '3' || lastNumber === '4') {
            return 'канала'
        }
        else if(lastNumber === '5' || lastNumber === '6' || lastNumber === '7' || lastNumber === '8' || lastNumber === '9' || lastNumber === '0'){
            return 'каналов'
        } 
    }
    const chooseTariffHandler = () => {
        props.setDataForRequest({
            ...props.dataForRequest,
            tariff: props.tariff
        })
    }
    
    return(
        <div id='TariffCard'>
            <div>
                <p>{tariffName}</p>
                <div>
                    <div>
                        <p>Домашний интернет и тв</p>
                        <div>
                            <p>Интернет</p>
                            <p><span>{speed}</span> Мбит/с</p>
                        </div>                        
                        <div>
                            <p>Цифровое тв</p>
                            {(channels === 'нет')
                                ?<p className='failure'>Не входит</p>
                                :<p><span>{channels}</span> {channelPostfix(channels)}</p>
                            }                            
                        </div>
                    </div> 
                        {(mobileCalls === 'нет')
                            ?(<div>
                                <p>Мобильная связь</p>
                                <p className='failure'>Не входит</p>
                            </div>)
                            :(<div>
                                <p>Мобильная связь</p>
                                <div>
                                    <p>Интернет</p>
                                    <p><span>{mobileEnternet}</span>{ (typeof(mobileEnternet) === 'number')?' Гб':null}</p>
                                </div>
                                <div>
                                    <p>Звонки</p>
                                    <p><span>{mobileCalls}</span> мин</p>
                                </div>
                            </div>)
                        }
                </div>
            </div>
            <div>
                {chooseProviderLogo(provider)}
                <p>
                    <span>{price}</span>
                    р/мес
                </p>
                <Link to='/aboutTariff' onClick={chooseTariffHandler}>
                    Подключить
                </ Link>
            </div>
        </div>
    )
}