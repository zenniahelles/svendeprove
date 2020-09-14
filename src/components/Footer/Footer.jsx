import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'

function Footer() {
    return (
        <footer>
            <section className="FooterGrid">
                <article>
                <p>INFORMATION:</p>
                <Link className="links" to="/">Link1</Link>
                <Link className="links" to="/">Link2</Link>
                <Link className="links" to="/">Link3</Link>
                <Link className="links" to="/">Link4</Link>
                </article>

                <article>
                <p>KONTAKT OS:</p>
                <p></p>
                <p></p>
                </article>

                <article>
                    <p>SOCIAL:</p>
                    <AiOutlineInstagram className="icon" style={{ height: '2em', width: '2em' }}/>
                    <FaFacebookF className="icon"/>
                </article>
            </section>
        </footer>
    )
}

export default Footer
