import React from 'react';
import './Categories.css'; // Si vous avez des styles spécifiques


function Categories() {
    return (
       <div className='categories'> 
        <button>Tous</button>
        <button>Objects</button>
        <button>Appartements</button>
        <button>Hotels et Restaurants</button>
        </div>
    );
}

export default Categories;