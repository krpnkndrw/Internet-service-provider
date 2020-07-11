import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './AuthPage.css'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        login: '', 
        password: ''
    })
    const intutChangeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async() => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
    }

    const loginHandler = async() => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
        const user = await response.json()       
        auth.login(user.token, user.userId)
    }
    
    return(
        <div>
            <div className="inputField">
                <input
                  placeholder="Логин"
                  id="login"
                  type="text"
                  name="login"
                  className="yellow-input"
                  onChange={intutChangeHandler}
                />
            </div>
            <div className="inputField">
                <input
                  placeholder="Пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={intutChangeHandler}
                />
            </div>
            <button
                onClick ={registerHandler}
            >
                Зарегистрироваться
            </button>
            <button
                onClick ={loginHandler}
            >
                Войти
            </button>            
        </div>
    )
}