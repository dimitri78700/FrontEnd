import React, { useState } from 'react';
import './Login.css';


function Login() {
  // Déclaration des états pour gérer l'email, le mot de passe et les erreurs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction déclenchée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut

    try {
      // Envoie de la requête POST à l'API de connexion
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Spécifie que l'envoi est en JSON
        },
        body: JSON.stringify({ email, password }) // Convertit les données en chaîne JSON
      });

      // Vérifie si la réponse n'est pas correcte (statut non 200)
      if (!response.ok) {
        throw new Error('Échec de la connexion');
      }

      // Récupère les données JSON de la réponse
      const data = await response.json();
      console.log('Connexion réussie:', data);

      // Stocke le token reçu dans le localStorage pour une utilisation future
      localStorage.setItem('token', data.token);
    } catch (err) {
      // Définit le message d'erreur en cas d'échec de la requête
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
          value={email} // Liaison de l'état email à l'input
          onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état email
          required // Champ requis
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password} // Liaison de l'état password à l'input
          onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état password
          required // Champ requis
        />
      <input type="submit" value="Se connecter" />
      </form>
      <p><a href="#">Mot de passe oublié</a></p>
    </section>
  );
}

export default Login; // Exporte le composant pour l'utiliser ailleurs
