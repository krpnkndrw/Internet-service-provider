import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Auth.css'

export const Auth = () => {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        login: '', 
        password: ''
    })
    const [mod, setMod] = useState('Login')
    const inputChangeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async(event) => {
        event.preventDefault()
        /*const response = */await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
    }

    const loginHandler = async(event) => {
        event.preventDefault()
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
    const ModChooser = (nextMod) => {
        setMod(nextMod)
    }
    
    return(
        <div id='Auth'>
            <div>
                <button onClick={() => ModChooser('Login')} className={(mod==='Login')&&'ModActive'}>Вход</button>
                <button onClick={() => ModChooser('Register')} className={(mod==='Register')&&'ModActive'}>Регистрация</button> 
            </div>
            <form>
                <input
                  placeholder="Логин"
                  id="login"
                  type="text"
                  name="login"
                  required
                  onChange={inputChangeHandler}
                />
                <input
                  placeholder="Пароль"
                  id="password"
                  type="password"
                  name="password"
                  required
                  onChange={inputChangeHandler}
                />
            {
                (mod === 'Login')
                    ?<button 
                        type="submit" 
                        onClick = {loginHandler}
                    >
                        Войти
                    </button>
                    :<button 
                        type="submit"
                        onClick = {registerHandler}
                    >
                        Зарегистрироваться
                    </button>
            } 
            </form>       
        </div>
    )
}