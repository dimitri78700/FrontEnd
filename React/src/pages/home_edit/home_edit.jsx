import React from 'react'; // Import des styles généraux
import HeaderEdit from '../../components/Edition/HeaderEdit';
import Introduction from '../../components/Intro/Intro';
import PortfolioEdit from '../../components/Edition/PortfolioEdit';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

function Home () {
    return (
        <div className="App">
            <HeaderEdit />
            <Introduction />
            <PortfolioEdit />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;