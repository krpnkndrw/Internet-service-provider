import React from 'react'
import './SuccessModalWindow.css'

export const SuccessModalWindow = (props) => {

    const successRequestModalBackHandler = () => {
        props.setSuccessModalShow(false)
    } 
    return(
        <div id='successRequestModal'>
            <div 
                id='successRequestModalBack'
                onClick={successRequestModalBackHandler}
            ></div>
            <div id='successRequestModalWindow'>
                <button onClick={successRequestModalBackHandler} ><i className="fas fa-times"></i></button>
                <h2>Заявка успешно отправлена</h2>
                <p>Ожидайте звонка</p>
            </div>
        </div>
    )
}