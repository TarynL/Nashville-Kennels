import React from 'react';
import "./Animal.css";

export const AnimalCard = ({ animal, handleDeleteAnimal }) => {
  return (
    <div className="card">
      <div className="card-content">
        
        <h3>Name: <span className="card-petname">
          {animal.name}
        </span></h3>
        <p>Breed: {animal.breed}</p>
        <button type="button" onClick={() => handleDeleteAnimal(animal.id)}>Discharge</button>
      </div>
    </div>
  );
}