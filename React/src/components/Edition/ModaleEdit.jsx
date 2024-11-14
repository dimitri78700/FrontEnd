import React, { useState, useEffect } from "react";
import Trash from "../../images/trasher.png";
import Image from "../../images/image.png";

const ModalAdd = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
        <form className="add-photo-form">
          <div className="form-photo">
            <img src={Image} alt="image-photo" className="photo-image" />
            <input  type="file" title="" placeholder=" + Ajouter une photo" className="add-input-photo" />
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Catégorie:</label>
            <select
              id="category-add"
              name="category"
              className="category-input"
            >
              <option value="">Choisir une catégorie</option>
              <option value="nature">Nature</option>
              <option value="architecture">Architecture</option>
              <option value="portrait">Portrait</option>
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

const Modal = ({ isOpen, onClose }) => {
  const [works, setWorks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to control Add Photo modal

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => setWorks(data))
        .catch((error) =>
          console.error("Erreur lors du chargement des projets:", error)
        );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Function to handle opening the Add Photo modal
  const handleAddPhotoClick = (event) => {
    event.stopPropagation(); // Prevent the modal from closing when clicking the button
    setIsAddModalOpen(true);
  };

  // Function to handle closing the Add Photo modal
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
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
              <img src={Trash} alt="Supprimer" className="trash-icon" />
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
