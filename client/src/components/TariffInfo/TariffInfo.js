import  React from 'react'
import { chooseProviderLogo } from '../chooseProviderLogo'
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
    const router = props.dataForRequest.tariff['Роутер']
    const routerPrice = props.dataForRequest.tariff['Стоимость роутера']
    const tvRouter = props.dataForRequest.tariff['ТВ-приставка']
    const tvRouterPrice = props.dataForRequest.tariff['Стоимость ТВ-приставки']
    
    const channelAndMinutesPostfix = (word, count) => {
        let lastNumber = +`${count}`.slice(-1);
        console.log(lastNumber)
        if(+count >= 5 && +count <= 20){
            if (word === 'минута') return 'минут'
            else if (word === 'канал') return 'каналов'      
        }
        else if(lastNumber === 1) {
            if (word === 'минута') return 'минута'
            else if (word === 'канал') return 'канал'  
        }
        else if(lastNumber === 2 || lastNumber === 3 || lastNumber === 4) {
            if (word === 'минута') return 'минуты'
            else if (word === 'канал') return 'канала' 
        }
        else if(lastNumber === 5 || lastNumber === 6 || lastNumber === 7 || lastNumber === 8 || lastNumber === 9 || lastNumber === 0){
            if (word === 'минута') return 'минут'
            else if (word === 'канал') return 'каналов' 
        } 
    }

    const checkboxHandler = (event) => {
        props.setAddOptions({
            ...props.addOptions,
            [event.target.name]: event.target.checked
        })
    }

    return(
        <div id='TariffInfo'>
            {chooseProviderLogo(provider)}   
            <h1>{tariffName}</h1>
            <div id='priceInfo'>
                <div>
                    <div>
                        <p>Подключение</p>
                        {connectPrice===0?<p>Бесплатно</p>:<p><span>{connectPrice}</span><span> руб</span></p>}
                     </div>
                </div>
                <div>
                    <div>
                        <p>Абонентская плата</p>
                        <p><span>{price}</span><span> руб/мес</span></p>
                    </div>
                </div>
            </div>
            <h2>Домашний интернет и тв</h2>
            <div>
                <div>
                    <div>
                        <p>Домашний интернет</p>
                        <p><span>{speed}</span><span> Мбит/с</span></p>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Цифровое тв</p>
                        {channels === 0 ? <p>нет</p> : <p><span>{channels}</span><span> {channelAndMinutesPostfix('канал', channels)}</span></p>}  
                    </div>
                </div>
            </div>
            <h2>Мобильная связь</h2>
            <div>
                <div>
                    <div>
                        <p>Звонки</p>
                        {mobileCalls === 'нет' ? <p>нет</p> : <p><span>{mobileCalls}</span><span> {channelAndMinutesPostfix('минута', mobileCalls)}</span></p>}
                     </div>
                </div>
                <div>
                    <div>
                        <p>Мобильный интернет</p>
                        { mobileEnternet === 'нет' ?
                            <p>нет</p> : mobileEnternet === 'Безлимит' ?
                            <p>Безлимит</p> : <p><span>{mobileEnternet}</span><span> Гб</span></p>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <p>СМС</p>
                        {sms === 'нет' ? <p>нет</p> : <p><span>{sms}</span><span> шт</span></p>}
                    </div>
                </div>
            </div>
            <h2>Дополнительно</h2>
                <div>
                    { (router !== 'нет') 
                        ?<div>
                            <div>
                                <p>Роутер</p>
                                {routerPrice === 0 ? <p>Бесплатно</p> : <p><span>{routerPrice}</span><span> руб/мес</span></p>}
                            </div>
                            <input  
                                type = 'checkbox'
                                name = 'router'
                                value = {props.addOptions.router}
                                onChange = {checkboxHandler}
                            />
                        </div>                        
                        :null
                    }
                    { (tvRouter !== 'нет') 
                        ?<div>
                            <div>
                                <p>ТВ-приставка</p>
                                {tvRouterPrice === 0 ? <p>Бесплатно</p> : <p><span>{tvRouterPrice}</span><span> руб/мес</span></p>}
                            </div>
                            <input  
                                type = 'checkbox'
                                name = 'tvRouter'
                                value = {props.addOptions.tvRouter}
                                onChange = {checkboxHandler}
                            />
                        </div>                        
                        :null
                    } 
                </div>              
        </div>        

    )
}   