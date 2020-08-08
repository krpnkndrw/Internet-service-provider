import React from 'react'
import './RequestCard.css'

export const RequestCard = (props) => {
    return(
        <div className={props.request.done?'requestCard requestCardDone':'requestCard requestCardNotDone'}>
            <ul>
                <li>
                    <span>Дата:</span> 
                    <span> {props.request.dateOfRequest.toString().slice(0,-8).split('T').join(' ')}</span>
                </li>
                <li>
                    <span>Имя:</span> 
                    <span> {props.request.name}</span>
                </li>
                <li>
                    <span>Телефон:</span> 
                    <span> {props.request.phone}</span>
                </li> 
                <li>
                    <span>Адрес:</span> 
                    <span> {props.request.house['Адрес']}</span>
                </li>                        
                <li>
                    <span>Тариф:</span> 
                    <span> {`${props.request.tariff['Провайдер']} ${props.request.tariff['Название']}`}</span>
                </li>                
            </ul>
            <div>
                <button onClick={() => props.deleteRequestHandle(props.request._id)}>Удалить</button>
                <button onClick={() => props.doneRequestHandle(props.request._id)}>{props.request.done?'Переоткрыть':'Закрыть'}</button>
            </div>
        </div>
    )
}