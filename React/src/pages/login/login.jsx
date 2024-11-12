import React from 'react';
import './login.css';
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Footer from '../../components/Footer/Footer';

function LoginPage () {
    return (
        <div className="App">
            <Header />
            <Login />
            <Footer />
        </div>
    );
}

export default LoginPage;