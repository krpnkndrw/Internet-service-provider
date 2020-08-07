import  React from 'react';
import './TariffInfo.css'

export const TariffInfo = (props) => {
    const provider = props.dataForRequest.tariff['Провайдер']
    const tariffName = props.dataForRequest.tariff['Название']
    const speed = props.dataForRequest.tariff['Скорость']
    const connectPrice = props.dataForRequest.tariff['Стоимость подключения']
    const price = props.dataForRequest.tariff['Цена']
    const channels = props.dataForRequest.tariff['Каналы']
    const mobileEnternet = props.dataForRequest.tariff['Мобильный интернет']
    const mobileCalls = props.dataForRequest.tariff['Мобильная связь']
    const sms = props.dataForRequest.tariff['СМС']

    const chooseProviderLogo = (provider) => {
        if(provider === 'ДОМ.ru') return <img src='http://localhost:3000/static/DOMru3.png' alt={provider}></img>
        if(provider === 'Beeline') return <img src='http://localhost:3000/static/Beeline.png' alt={provider}></img>
        if(provider === 'МТС') return <img src='http://localhost:3000/static/mts.png' alt={provider}></img>
        if(provider === 'Ростелеком') return <img src='http://localhost:3000/static/Rostelecom.png' alt={provider}></img>
    }
    const channelAndMinutesPostfix = (word, count) => {
        let lastNumber = +`${count}`.slice(-1);
        console.log(lastNumber)
        if(+count >= 5 && +count <= 20){
            switch(word){
                case 'минута': return 'минут'
                case 'канал': return 'каналов'
            }            
        }
        else if(lastNumber === 1) {
            switch(word){
                case 'минута': return 'минута'
                case 'канал': return 'канал'
            } 
        }
        else if(lastNumber === 2 || lastNumber === 3 || lastNumber === 4) {
            switch(word){
                case 'минута': return 'минуты'
                case 'канал': return 'канала'
            } 
        }
        else if(lastNumber === 5 || lastNumber === 6 || lastNumber === 7 || lastNumber === 8 || lastNumber === 9 || lastNumber === 0){
            switch(word){
                case 'минута': return 'минут'
                case 'канал': return 'каналов'
            } 
        } 
    }

    return(
        <div id='TariffInfo'>
            {chooseProviderLogo(provider)}   
            <h1>{tariffName}</h1>
            <div id='priceInfo'>
                <div>
                    <p>Подключение</p>
                     {connectPrice===0?<p>Бесплатно</p>:<p><span>{connectPrice}</span><span> руб</span></p>}
                </div>
                <div>
                    <p>Абонентская плата</p>
                    <p><span>{price}</span><span> руб/мес</span></p>
                </div>
            </div>
            <h2>Домашний интернет и тв</h2>
            <div>
                <div>
                    <p>Домашний интернет</p>
                    <p><span>{speed}</span><span> Мбит/с</span></p>
                </div>
                <div>
                    <p>Цифровое тв</p>
                    {channels === 0?<p>нет</p>:<p><span>{channels}</span><span> {channelAndMinutesPostfix('канал', channels)}</span></p>}  
                </div>
            </div>
            <h2>Мобильная связь</h2>
            <div>
                <div>
                    <p>Звонки</p>
                     {mobileCalls==='нет'?<p>нет</p>:<p><span>{mobileCalls}</span><span> {channelAndMinutesPostfix('минута', mobileCalls)}</span></p>}
                </div>
                <div>
                    <p>Мобильный интернет</p>
                    { mobileEnternet==='нет' ?
                        <p>нет</p> : mobileEnternet==='Безлимит' ?
                        <p>Безлимит</p> : <p><span>{mobileEnternet}</span><span> Гб</span></p>
                    }
                </div>
                <div>
                    <p>СМС</p>
                    {sms==='нет'?<p>нет</p>:<p><span>{sms}</span><span> шт</span></p>}
                </div>
            </div>
        </div>        

    )
}   