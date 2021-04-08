import React, {useState, useEffect} from 'react';
import {updateEmployee, getEmployeeById} from "../../modules/EmployeeManager";
import "./EmployeeForm.css";
import {useHistory, useParams} from 'react-router-dom';
import {getAllLocations} from '../../modules/LocationManager';
import {getAllAnimals} from '../../modules/AnimalManager';

export const EmployeeEditForm = () => {
    const [employee, setEmployee] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { employeeId } = useParams();
    const history = useHistory();

    const [locations, setLocations] = useState([]);
    const [animals, setAnimals] = useState([]);

    const handleFieldChange = event => {
        const stateToChange = {...employee};
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }

        stateToChange[event.target.id] = selectedVal
        setEmployee(stateToChange);
    };

    const updateExistingEmployee = event => {
        event.preventDefault()
        setIsLoading(true);

        const editedEmployee = {
            id: employeeId,
            name: employee.name,
            email: employee.email,
            locationId: employee.locationId,
            animalId: employee.animalId
        };

        const locationId = employee.locationId
        const animalId = employee.animalId

        if (locationId === 0 || animalId === 0) {
            window.alert("Please select a location and an animal")
        } else{
            updateEmployee(editedEmployee)
            .then(() => history.push("/employees"))
        }
    }

    useEffect(() => {
        getEmployeeById(employeeId)
        .then(employee => {
            setEmployee(employee);
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
        getAllAnimals()
        .then(animalsFromAPI => {
            setAnimals(animalsFromAPI)
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
                            value={employee.name}
                        />
                        <label htmlFor="name">Employee name</label>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="breed"
                            value={employee.email}
                        />
                        <label htmlFor="email">email</label>


                        <select
                            value={employee.locationId}
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
                    value={employee.animalId} 
                    name="animal" id="animalId" 
                    onChange={handleFieldChange} 
                    className="form-control" >
						<option value="0">Select an animal</option>
						{animals.map(a => (
							<option key={a.id} value={a.id}>
								{a.name}
							</option>
						))}
					</select>
                    <label htmlFor="animalId">Animal: </label>

                    </div>
                    <div className="alignRight">
                        <button
                            type="button" disabled={isLoading}
                            onClick={updateExistingEmployee}
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}