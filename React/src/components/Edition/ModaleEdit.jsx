import React, { useState, useEffect } from "react";
import Image from "../../images/image.png"; // Image par défaut
import Trash from "../../images/trasher.png"; // Icone de la corbeille (si nécessaire)
import { Link } from "react-router-dom";

const ModalAdd = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // États pour gérer les informations du formulaire
  const [fileName, setFileName] = useState(' + Ajouter une photo');
  const [file, setFile] = useState(null); // Fichier sélectionné
  const [title, setTitle] = useState(''); // Titre de la photo
  const [category, setCategory] = useState(''); // Catégorie de la photo
  const [categories, setCategories] = useState([]); // Liste des catégories récupérées depuis l'API

  // Récupération des catégories depuis l'API lors du premier rendu
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5678/api/categories', {
          headers: {
            'accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Met à jour l'état avec les catégories reçues
        } else {
          console.error("Erreur lors du chargement des catégories");
        }
      } catch (error) {
        console.error("Erreur de requête:", error);
      }
    };

    fetchCategories(); // Appel de la fonction pour récupérer les catégories
  }, []); // Cette fonction est appelée une seule fois lors du premier rendu

  // Fonction pour gérer le changement de fichier
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : 'Aucun fichier choisi');
  };

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page lors de l'envoi du formulaire
    
    // Vérifie si tous les champs sont remplis
    if (!file || !title || !category) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    const formData = new FormData();
    formData.append('image', file); // Ajoute l'image au FormData
    formData.append('title', title); // Ajoute le titre
    formData.append('category', category); // Ajoute la catégorie

    try {
      // Envoi de la requête POST vers l'API
      const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData, // Corps de la requête avec FormData
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Photo ajoutée avec succès:", data);
        onClose();
         // Ferme le modal après l'ajout
        
      } else {
        console.error("Erreur lors de l'ajout de la photo:", response.status);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur de requête:", error);
      alert("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className="modal-add-overlay" onClick={onClose}>
      <div className="modal-add-content" onClick={(e) => e.stopPropagation()}>
        <button className="fleche-add-button" onClick={onClose}>
          &#60;
        </button>
        <button className="close-add-button" onClick={onClose}>
          &times;
        </button>
        <h4 className="modal-add-title">Ajouter une photo au portfolio</h4>
        <form className="add-photo-form" onSubmit={handleSubmit}>
          <div className="form-photo">
            <img src={Image} alt="image-photo" className="photo-image" />
            <label htmlFor="AddPhoto" className="add-label-photo">{fileName}</label>
            <input
              type="file"
              id="AddPhoto"
              className="add-input-photo"
              onChange={handleFileChange}
              hidden
            />
            <p>jpg, png : 4Mo max</p>
          </div>
          <div className="form-group">
            <label htmlFor="title">Titre:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="add-input"
              placeholder="Entrez un titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Catégorie:</label>
            <select
              id="category-add"
              name="category"
              className="category-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Catégories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} {/* Assurez-vous que l'API retourne 'id' et 'name' */}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

// Modal : Modal principal affichant la galerie
const Modal = ({ isOpen, onClose }) => {
  const [works, setWorks] = useState([]); // Liste des travaux/photo récupérés
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Contrôle l'ouverture du modal d'ajout de photo
  useEffect(() => {
    if (isOpen) {
      // Récupérer les travaux depuis l'API lorsque le modal est ouvert
      fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => setWorks(data))
        .catch((error) =>
          console.error("Erreur lors du chargement des projets:", error)
        );
    }
  
   // Si le modal principal n'est pas ouvert, ne rien afficher
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddPhotoClick = (event) => {
    event.stopPropagation(); // Empêche le modal de se fermer lorsqu'on clique sur le bouton
    setIsAddModalOpen(true);
  };
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeletePhoto = (id) => {
    // Envoi une requête DELETE pour supprimer la photo sur le backend
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
    })
      .then((response) => {
        if (response.ok) {
          // Si la suppression est réussie, on met à jour l'état local
          setWorks(works.filter(work => work.id !== id));
          alert("Photo supprimée");
        } else {
          console.error("Erreur lors de la suppression de la photo.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la photo:", error);
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* Prevent closing when clicking inside */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Galerie de photos</h3>
        <div className="photo-gallery">
          {works.map(({ id, imageUrl, title }) => (
            <div key={id} className="photo-item">
              <img src={Trash} alt="Supprimer" className="trash-icon"
                onClick={() => handleDeletePhoto(id)} />
              <img src={imageUrl} alt={title} className="photo" />
            </div>
          ))}
        </div>
        {/* Button to trigger Add Photo modal */}
        <button
          className="add-photo-button"
          onClick={handleAddPhotoClick}
          onClose={handleCloseAddModal}
        >
          Ajouter une photo
        </button>
      </div>

      {/* Add Photo Modal */}
      {isAddModalOpen && (
        <ModalAdd isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
      )}
    </div>
  );
};

export default Modal;
