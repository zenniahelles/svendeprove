import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import Headerbg from '../Images/header-bg.png';
import Mail from '../Images/mail-icon.png';
import Phone from '../Images/phone-icon.png';
import Cart from '../Images/cart-icon.png';
import Home from '../Images/home-icon.png';


function Header() {
    return (
        <header>
        <section className="HeaderGrid">
            <nav className="TopNav">
                <img className="NavImage" src={Headerbg} alt="header"/>
                <div className="Links">
                    <span><Link to="/">Forside</Link></span>
                    <span><Link to="/">Salgs- og handelsbetingelser</Link></span>
                    <Link to="/login"><button>Login</button></Link>
                </div>
            </nav>

            <section className="Search">
            <img src={Mail} className="Mail" alt="mail-icon"/><span>SALES@STRINGSONLINE.COM</span>
            <img src={Phone} className="Phone" alt="phone-icon"/><span>+45 98 12 22 68</span>
            <img src={Cart} className="Cart" alt="cart-icon"/>
            <Link to ="/search"><button>Søg</button></Link>
            </section>

        </section>

        <section className="Breadcrumbs">
        <img src={Home} className="Home" alt="home-icon"/><Link to="/">Forside</Link>
        </section>
        </header>
    )
}

export default Header
