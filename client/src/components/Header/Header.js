import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { pathToFiles } from '../pathToFilesFinder'
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
                    <source src={`${pathToFiles}office_1.webm`} type="video/mp4"/>
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
                    {auth.isAuthenticated
                        ?<li>
                            <Link to='/admin'> 
                                Админ 
                            </Link>
                        </li> 
                        :null
                    }                    
                    <li>
                        {auth.isAuthenticated
                            ?<button onClick ={logoutHandler}>Выйти</button>
                            :<Link to='/admin'> 
                                Войти 
                            </Link>
                        }
                    </li> 
                </ul>
                </div>
            </nav>
        </header>
    )
}