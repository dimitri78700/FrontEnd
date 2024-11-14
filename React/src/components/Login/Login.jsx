import React, { useState } from 'react';
import './Login.css';
import { Navigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Échec de la connexion');
      }

      const data = await response.json();
      console.log('Connexion réussie:', data);
      localStorage.setItem('token', data.token); // Stocke le token pour les futures requêtes
      window.location.href = '/home_edit'; 
      
    } catch (err) {
      setError('Identifiants incorrects, veuillez réessayer.');
    }
  };

  return (
    <section className='login'>
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Se connecter" />
      </form>
      {error && <p className="error">{error}</p>}
      <p><a href="#">Mot de passe oublié</a></p>
    </section>
  );
}

export default Login;


