import  React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './TariffRequestForm.css'

export const TariffRequestForm = (props) => {
    const connectPrice = props.dataForRequest.tariff['Стоимость подключения']
    const price = props.dataForRequest.tariff['Цена']
    const house = props.dataForRequest.house
    const routerPrice = props.dataForRequest.tariff['Стоимость роутера']
    const tvRouterPrice = props.dataForRequest.tariff['Стоимость ТВ-приставки']

    
    const initErrorMessage = {
        name: '',
        phone: ''
    }
    const [errorMessage, setErrorMessage] = useState(initErrorMessage)

    const totalCostCalc = () => {
        let newTotalCost = connectPrice + price
        if(props.addOptions.router){
            newTotalCost += routerPrice
        }
        if(props.addOptions.tvRouter){
            newTotalCost += tvRouterPrice
        }
        return newTotalCost
    }

    const inputHandler = (event) => {            
        props.setDataForRequest({
            ...props.dataForRequest,
            [event.target.name]: event.target.value
        })
    }
    const sumbitHandler = (event) => {
        event.preventDefault()
        console.log(!props.dataForRequest.name, !props.dataForRequest.phone, !props.dataForRequest.name || !props.dataForRequest.phone)
        if(!props.dataForRequest.name || !props.dataForRequest.phone){
            const newErrorMessage = {
                name: '',
                phone: ''
            }
            if(!props.dataForRequest.name){
                newErrorMessage.name = 'Введите имя'
            }
            if(!props.dataForRequest.phone){
                newErrorMessage.phone = 'Введите номер'
            }
            setErrorMessage(newErrorMessage)
        }else {
            props.sendRequest()
        }
    }
    return(
        <div id='TariffRequestForm'>
            <p>Подключение тарифа по адресу</p>
            {house 
                ?<p>{house['Адрес']}</p>
                :<Link to='/availableTariffs'>
                    Проверить адрес
                </ Link>
            }
            {(connectPrice !== 0)
                ?<div>
                    <p>Подключение</p>
                    <p><span>{connectPrice}</span><span> руб</span></p>
                </div>
                :<div>
                    <p>Подключение</p>
                    <p>Бесплатно</p>
                </div>
            }
            <div>
                <p>Абонентская плата</p>
                <p><span>{price}</span><span> руб</span></p>
            </div>
            {
                props.addOptions.router &&
                    <div>
                        <p>Роутер</p>
                        <p><span>{routerPrice}</span><span> руб</span></p>
                    </div>
            }
            {
                props.addOptions.tvRouter &&
                    <div>
                        <p>ТВ-приставка</p>
                        <p><span>{tvRouterPrice}</span><span> руб</span></p>
                    </div>
            }
            <div>
                <p>Итого</p>
                <p><span>{totalCostCalc()}</span><span> руб</span></p>
            </div>      
            <form>
                <input 
                    type='text' 
                    placeholder='Ваше имя'
                    name='name'
                    value={props.dataForRequest.name}
                    onChange={inputHandler}
                    required
                />
                {errorMessage.name && <div className='requestFormError'>{errorMessage.name}</div>}
                <input 
                    type='text' 
                    placeholder='Телефон'
                    name='phone'
                    value={props.dataForRequest.phone}
                    onChange={inputHandler}
                    required
                />
                {errorMessage.phone && <div className='requestFormError'>{errorMessage.phone}</div>}
                <button
                    type="submit"
                    disabled={house ? false : true}
                    onClick={sumbitHandler}
                >
                    Отправить заявку
                </button>
            </form>
        </div>
    )
}