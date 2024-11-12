import React from 'react';
import './home.css'; // Import des styles généraux
import Header from '../../components/Header/Header';
import Introduction from '../../components/Intro/Intro';
import Portfolio from '../../components/Portfolio/Portfolio';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

function Home () {
    return (
        <div className="App">
            <Header />
            <Introduction />
            <Portfolio />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;