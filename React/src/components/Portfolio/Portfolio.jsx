import React, { useEffect, useState } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [works, setWorks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  useEffect(() => {
    fetch('http://localhost:5678/api/works') // Récupère les projets de l'API
      .then(response => response.json())
      .then(setWorks) // Mise à jour des projets
      .catch(() => setError('Erreur lors du chargement des projets'));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5678/api/categories') // Récupère les catégories de l'API
      .then(response => response.json())
      .then(setCategories) // Mise à jour des catégories
      .catch(() => setError('Erreur lors du chargement des catégories'));
  }, []);

  // Filtrer les travaux selon la catégorie sélectionnée
  const filteredWorks = selectedCategory === 'Tous'
    ? works
    : works.filter(work => work.category.name === selectedCategory);

  return (
    <section id="portfolio"> 
      <h2>Mes Projets</h2>

      <div className='categories'> 
        
        <button onClick={() => setSelectedCategory('Tous')} >Tous</button>
        
        {categories.map(({ id, name }) => (
          <button key={id} onClick={() => setSelectedCategory(name)}>
            {name}
          </button>

        ))}
        </div>

      <div className="gallery"> 
        {filteredWorks.map(({ id, imageUrl, title }) => ( // affichage des projets
          <figure key={id}>
            <img src={imageUrl} alt={title} />
            <figcaption>{title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
