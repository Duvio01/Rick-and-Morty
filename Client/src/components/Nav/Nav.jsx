import { Link, useLocation } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import style from './nav.module.css'
import logoRickAndMorty from '../Images/LogoRick.jpeg'

const Nav = (props) => {
    const location = useLocation()

    return (
        <>
            <div className={style.container}>
                <Link to='/home'>
                    <img src={logoRickAndMorty} alt='Logo Rick and Morty' />
                </Link>
                <Link to='/about'>
                    <button>About</button>
                </Link>
                <Link to='/home'>
                    <button>Home</button>
                </Link>
                <Link to='/favorites'>
                    <button>Favorites</button>
                </Link>
                {
                    location.pathname === '/home' && (
                        <div>
                            <SearchBar onSearch={props.search} />
                        </div>
                    )
                }
                <button onClick={props.logout}>Logout</button>
            </div>
        </>
    )
}

export default Nav