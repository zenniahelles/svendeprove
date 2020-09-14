import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss'

function Desktop() {

return(
    <nav className="Navigation">
        <ul>
            <Link className="link" to="/">FORSIDE</Link>
            <span>|</span>
            <Link className="link" to="/multifetch">MULTIFETCH</Link>
            <span>|</span>
            <Link className="link" to="/fetch">FETCH</Link>
            <span>|</span>
            <Link className="link" to="/ratings">RATINGS</Link>
            <span>|</span>
            <Link className="link" to="/postform">POSTFORM</Link>
            <span>|</span>
            <Link className="link" to="/search">SEARCH</Link>
            <span>|</span>
            <Link className="link" to="/login">LOGIN</Link>
        </ul>
    </nav>
)
}

export default Desktop
