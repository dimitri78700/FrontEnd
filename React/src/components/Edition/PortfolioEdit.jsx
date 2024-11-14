import React, { useEffect, useState } from "react";
import Vector from "../../images/Vector2.png";
import "../Portfolio/Portfolio.css";
import Modal from "./ModaleEdit"; // Assure-toi que le chemin d'import est correct

const PortfolioEdit = () => {
  const [works, setWorks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour la modal

  useEffect(() => {
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then(setWorks)
      .catch(() => setError("Erreur lors du chargement des projets"));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
      .then(setCategories)
      .catch(() => setError("Erreur lors du chargement des catégories"));
  }, []);

  const filteredWorks =
    selectedCategory === "Tous"
      ? works
      : works.filter((work) => work.category.name === selectedCategory);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="portfolio">
      <h2>
        Mes Projets
        <p className="PortfolioEdit">
          <img
            onClick={handleOpenModal}// Ouvre la modal au clic
            src={Vector}
            alt="vector"
            typeof="button"
          />
          Modifier
        </p>
       
      </h2>

      <div className="categories">
        <button onClick={() => setSelectedCategory("Tous")}>Tous</button>
        {categories.map(({ id, name }) => (
          <button key={id} onClick={() => setSelectedCategory(name)}>
            {name}
          </button>
        ))}
      </div>

      <div className="gallery">
        {filteredWorks.map(({ id, imageUrl, title }) => (
          <figure key={id}>
            <img src={imageUrl} alt={title} />
            <figcaption>{title}</figcaption>
          </figure>
        ))}
      </div>

      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};

export default PortfolioEdit;

