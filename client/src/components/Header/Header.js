import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Header.css';

export const Header = () => {
    const auth = useContext(AuthContext)
    const logoutHandler = () => {
        auth.logout()
    }
    return(
        <header>
            <div id='headerBackground'>
                <video autoPlay muted loop>
                    <source src='http://localhost:3000/static/office_1.webm' type="video/mp4"/>
                </video>
                <div></div>
            </div>
            <nav>
                <div>
                <Link to='/'> 
                    Подключение интернета в Омске
                </Link>
                <ul>
                    <li>
                        <Link to='/availableTariffs'> 
                            Подбор тарифа 
                        </Link>
                    </li>
                    <li>
                        <Link to='/allTariffs'> 
                            Все тарифы 
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin'> 
                            Админ 
                        </Link>
                    </li>
                    {auth.isAuthenticated
                        ?<button onClick ={logoutHandler}>Выйти</button>
                        :null
                    } 
                </ul>
                </div>
            </nav>
        </header>
    )
}