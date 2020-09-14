import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom'
import './Navigation.scss'

export default props => {
  return (
    <Menu {...props}>
      <nav className="sidebar">
        <ul>
            <Link className="SideLink" to="/forside">FORSIDE</Link>
            <Link className="SideLink" to="/om">OM RØRDAL RUN</Link>
            <Link className="SideLink" to="/distancer">DISTANCER</Link>
            <Link className="SideLink" to="/tilmelding">TILMELDING</Link>
            <Link className="SideLink" to="/deltagerliste">DELTAGERLISTE</Link>
            <Link className="SideLink" to="/login">LOGIN</Link>
        </ul>
        </nav>
    </Menu>
  );
};
