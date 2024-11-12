import React from 'react';
import './Header.css'; // Si vous avez des styles spécifiques
import insta from "../../images/instagram.png";
import { Link } from "react-router-dom";



function Header() {
    return (
        <header>
            <h1><Link to="/">Sophie Bluel</Link> <span>Architecte d'intérieur</span></h1>
            <nav>
                <ul>
                    <li>projets</li>
                    <li>contact</li>
                    <li><Link to="/login">login</Link></li>
                    <li><img src={insta} alt="Instagram" /></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
