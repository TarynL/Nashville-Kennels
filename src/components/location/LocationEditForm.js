import React, { useState, useEffect } from "react";
import { updateLocation, getLocationById } from "../../modules/LocationManager"
import "./LocationForm.css";
import { useHistory, useParams } from 'react-router-dom';
import { getAllAnimals } from '../../modules/AnimalManager';
import { getAllEmployees } from '../../modules/EmployeeManager';

export const LocationEditForm = () => {
    const [location, setLocation] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const { locationId } = useParams();
    const history = useHistory();

    const [animals, setAnimals] = useState([]);
    const [employees, setEmployees] = useState([]);

    const handleFieldChange = event => {
        const stateToChange = {...location};
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }

        stateToChange[event.target.id] = selectedVal
        setLocation(stateToChange);
    };

    const updateExistingLocation = event => {
        event.preventDefault()
        setIsLoading(true);

        const editedLocation = {
            id: locationId,
            name: location.name,
            address: location.address,
            animalId: location.animalId,
            employeeId: location.employeeId
        };

        const animalId = location.animalId
        const employeeId = location.employeeId

        if (animalId === 0 || employeeId === 0){
            window.alert("Please select an animal and an employee") 
        } else {
            updateLocation(editedLocation)
            .then(() => history.push("/locations"))
        }
    }

    useEffect(() => {
        getLocationById(locationId)
        .then(location => {
            setLocation(location);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        getAllAnimals()
        .then(animalsFromAPI => {
            setAnimals(animalsFromAPI)
        });
    }, []);

    useEffect(() => {
        getAllEmployees()
        .then(employeesFromAPI => {
            setEmployees(employeesFromAPI)
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
                            value={location.name}
                        />
                        <label htmlFor="name">Location name</label>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="address"
                            value={location.address}
                        />
                        <label htmlFor="address">Address</label>


                        <select
                            value={location.animalId}
                            name="animalId"
                            id="animalId"
                            onChange={handleFieldChange}
                            className="form-control" >
                            <option value="0">Select an animal</option>
                            {animals.map(a => (
                                <option key={a.id} value={a.id}>
                                    {a.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="animal">Animal</label>

					<select 
                    value={location.employeeId} 
                    name="employee" id="employeeId" 
                    onChange={handleFieldChange} 
                    className="form-control" >
						<option value="0">Select an employee</option>
						{employees.map(e => (
							<option key={e.id} value={e.id}>
								{e.name}
							</option>
						))}
					</select>
                    <label htmlFor="employeeId">Employee: </label>

                    </div>
                    <div className="alignRight">
                        <button
                            type="button" disabled={isLoading}
                            onClick={updateExistingLocation}
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );

}