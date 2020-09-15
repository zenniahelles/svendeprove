import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom'
import './Navigation.scss'
import Mail from '../Images/mail-icon.png';
import Phone from '../Images/phone-icon.png';


export default props => {
  return (
    <Menu {...props}>
      <nav className="sidebar">
        <ul>
            <Link className="SideLink" to="/forside">FORSIDE</Link>
            <Link className="SideLink" to="/om">SALGS- OG HANDELSB BETINGELSER</Link>
            <Link className="SideLink" to="/login">LOGIN</Link>
            <Link className="SideLink" to="/search">SØG</Link>
            <br/>
            <p><img src={Mail} className="Mail" alt="mail-icon"/> <span>SALES@STRINGSONLINE.COM</span></p>
            <p><img src={Phone} className="Phone" alt="phone-icon"/> <span>+45 98 12 22 68</span></p>
        </ul>
        </nav>
    </Menu>
  );
};
