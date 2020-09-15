import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'
import FooterImg from '../Images/footer.png'

function Footer() {
    return (
        <footer>
            <img src={FooterImg} alt="footer"/>
        </footer>
    )
}

export default Footer
