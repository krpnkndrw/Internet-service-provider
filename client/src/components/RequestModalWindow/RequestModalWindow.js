import React, { Fragment } from 'react'
import './RequestModalWindow.css'

export const RequestModalWindow = (props) => {

    const successRequestModalBackHandler = () => {
        props.setRequestModalWindowShow(false)
    } 
    return(
        <Fragment>
            {
                (props.requestModalWindowShow)&&<div id='successRequestModal'>
                <div
                    id='successRequestModalBack'
                    onClick={successRequestModalBackHandler}
                ></div>
                <div id='successRequestModalWindow'>
                    <button onClick={successRequestModalBackHandler} ><i className="fas fa-times"></i></button>
                    <h2>Заявка успешно отправлена!</h2>
                    <p>Ожидайте звонка</p>
                </div>
            </div>
            }
        </Fragment>
    )
}