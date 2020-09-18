import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import Headerbg from '../Images/header-bg.png';
import Mail from '../Images/mail-icon.png';
import Phone from '../Images/phone-icon.png';
import Cart from '../Images/cart-icon.png';
import Home from '../Images/home-icon.png';


function Header(props) {
    return (
        <header>
        <section className="HeaderGrid">

            <nav className="TopNav">
                <img className="NavImage" src={Headerbg} alt="header"/>
                <section className="Links">
                    <span><Link to="/">Forside</Link></span>
                    <span><Link to="/terms">Salgs- og handelsbetingelser</Link></span>
                    
                    {!props.loginData.access_token ? <Link to="/login"><button>Login</button></Link> :
                    <Link to="/login"><button>Profil</button></Link>}
                </section>
            </nav>

            <section className="Search">
            <section className="contact">
            <img src={Mail} className="Mail" alt="mail-icon"/><span>SALES@STRINGSONLINE.COM</span>
            <img src={Phone} className="Phone" alt="phone-icon"/><span>+45 98 12 22 68</span>
            </section>
            <Link to="getcart"><img src={Cart} className="Cart" alt="cart-icon"/></Link>
            <Link to ="/search"><button>Søg</button></Link>
            </section>

        </section>

        <section className="Breadcrumbs">
        <img src={Home} className="Home" alt="home-icon"/><Link to="/">Forside</Link>
        {!props.loginData.access_token ? <span></span> :
        <Link to="/history"><h2 className="historylink">Odrehistorik</h2></Link>}
        </section>
        </header>
    )
}

export default Header
