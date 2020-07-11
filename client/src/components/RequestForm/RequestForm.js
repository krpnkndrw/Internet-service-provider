import  React, {useEffect} from 'react';
import './RequestForm.css'

export const RequestForm = (props) => {
   
    const inputHandler = (event) => {
        console.log(props.dataForRequest)
        props.setDataForRequest({
            ...props.dataForRequest,
            [event.target.name]: event.target.value
        })
    }

    useEffect( () => {
        setTimeout( () => {
            window.scrollTo({
                top: document.getElementById('requestForm').offsetTop,
                behavior:"smooth"
            })
        }, 75)  
    }, [props.dataForRequest])

    const submitFormHandler = (event) => {
        event.preventDefault()
        props.requestSend()
    }

    return(
        <div id='requestForm'>
            <h2>Осталось только ввести контактные данные</h2>
            <form>
                <div>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Ваше имя"
                        value={props.dataForRequest.name} 
                        onChange={inputHandler} 
                        required                    
                    />
                    <input 
                        type="number"
                        name="phone"
                        placeholder="Телефон"
                        value={props.dataForRequest.phone} 
                        onChange={inputHandler}
                        required                  
                    />
                </div>
                {/* <div>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={props.dataForRequest.email} 
                        onChange={inputHandler} 
                        required                    
                    />
                </div>*/}
                <div>
                    <p>{`Спасибо ${props.dataForRequest.name}!`}</p>
                    <p>
                        {`Вы желаете подключить тариф "${props.dataForRequest.tariff['Название']}" по адресу 
                        ${props.dataForRequest.house['Адрес']}.`}
                    </p>
                    <p>
                        {`В ближайшее время вам позвонят на номер ${props.dataForRequest.phone},
                        чтобы уточнить детали заявки.`}
                    </p>
                    <button onClick={submitFormHandler}>Отправить заявку</button>
                </div>
            </form>            
        </div>
    )
}