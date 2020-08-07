import  React from 'react'
import { Link } from 'react-router-dom'
import './TariffRequestForm.css'

export const TariffRequestForm = (props) => {
    const connectPrice = props.dataForRequest.tariff['Стоимость подключения']
    const price = props.dataForRequest.tariff['Цена']
    const house = props.dataForRequest.house

    const inputHandler = (event) => {    
        props.setDataForRequest({
            ...props.dataForRequest,
            [event.target.name]: event.target.value
        })
    }
    const sumbitHandler = (event) => {
        event.preventDefault()
        props.sendRequest()
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
            <div>
                <p>Итого</p>
                <p><span>{connectPrice + price}</span><span> руб</span></p>
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
                <input 
                    type='text' 
                    placeholder='Телефон'
                    name='phone'
                    value={props.dataForRequest.phone}
                    onChange={inputHandler}
                    required
                />
                <button
                    type="submit"
                    disabled={house ? false : true}
                    onClick={sumbitHandler}
                >Отправить заявку
                </button>
            </form>
        </div>
    )
}