import React, { useState, useEffect } from 'react';
//import the components we will need
import { AnimalCard } from './AnimalCard';
import { getAllAnimals, getAnimalById, deleteAnimal } from '../../modules/AnimalManager';
//  step 1
export const AnimalList = () => {
  // The initial state is an empty array
  const [animals, setAnimals] = useState([]);

//   step 4 then back to step 2
  const getAnimals = () => {
    // After the data comes back from the API, we
    //  use the setAnimals function to update state
    return getAllAnimals()
    .then(animalsFromAPI => {
      setAnimals(animalsFromAPI)
    });
  };

//   step 3
  // got the animals from the API on the component's first render
  useEffect(() => {
    getAnimals();
  }, []);

  const handleDeleteAnimal = (id) => {
    deleteAnimal(id)
    .then(() => getAllAnimals().then(setAnimals));
};


 
//   step 2
  // Finally we use .map() to "loop over" the animals array to show a list of animal cards
  return (
    <div className="container-cards">
      {animals.map(animal =>
        <AnimalCard
          key={animal.id}
          animal={animal}
          handleDeleteAnimal={handleDeleteAnimal} />)}
    </div>
  );

  
};

  

