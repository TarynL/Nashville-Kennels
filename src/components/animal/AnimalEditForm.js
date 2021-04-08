import React, { useState, useEffect } from "react";
import { updateAnimal, getAnimalById } from "../../modules/AnimalManager";
import "./AnimalForm.css";
import { useHistory, useParams } from 'react-router-dom';
import { getAllLocations } from '../../modules/LocationManager';
import { getAllCustomers } from '../../modules/CustomerManager';

export const AnimalEditForm = () => {
    const [animal, setAnimal] = useState({ name: "", breed: "" });
    const [isLoading, setIsLoading] = useState(false);

    const { animalId } = useParams();
    const history = useHistory();

    const [locations, setLocations] = useState([]);
    const [customers, setCustomers] = useState([]);

    const handleFieldChange = evt => {
        const stateToChange = { ...animal };
        let selectedVal = evt.target.value
        if (evt.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        // look in the animal object copy and find the id of the key we are looking for
        stateToChange[evt.target.id] = selectedVal
        setAnimal(stateToChange);
    };

    const updateExistingAnimal = evt => {
        evt.preventDefault()
        setIsLoading(true);

        // This is an edit, so we need the id
        const editedAnimal = {
            id: animalId,
            name: animal.name,
            breed: animal.breed,
            locationId: animal.locationId,
            customerId: animal.customerId
        };

        const locationId = animal.locationId
		const customerId = animal.customerId

		if (locationId === 0 || customerId === 0) {
			window.alert("Please select a location and a customer")
		} else {

        updateAnimal(editedAnimal)
            .then(() => history.push("/animals")
            )}
    }

    useEffect(() => {
        getAnimalById(animalId)
            .then(animal => {
                setAnimal(animal);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        getAllLocations()
            .then(locationsFromAPI => {
                setLocations(locationsFromAPI)
            });
    }, []);

    useEffect(() => {
        getAllCustomers()
            .then(customersFromAPI => {
                setCustomers(customersFromAPI)
            });
    }, []);

    return (
        <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={animal.name}
                        />
                        <label htmlFor="name">Animal name</label>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="breed"
                            value={animal.breed}
                        />
                        <label htmlFor="breed">Breed</label>


                        <select
                            value={animal.locationId}
                            name="locationId"
                            id="locationId"
                            onChange={handleFieldChange}
                            className="form-control" >
                            <option value="0">Select a location</option>
                            {locations.map(l => (
                                <option key={l.id} value={l.id}>
                                    {l.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="location">Location</label>

					<select 
                    value={animal.customerId} 
                    name="customer" id="customerId" 
                    onChange={handleFieldChange} 
                    className="form-control" >
						<option value="0">Select a customer</option>
						{customers.map(c => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
                    <label htmlFor="customerId">Customer: </label>

                    </div>
                    <div className="alignRight">
                        <button
                            type="button" disabled={isLoading}
                            onClick={updateExistingAnimal}
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}