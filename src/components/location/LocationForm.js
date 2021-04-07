import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addLocation } from '../../modules/LocationManager';
import './LocationForm.css';
import { getAllAnimals } from '../../modules/AnimalManager';
import { getAllEmployees } from '../../modules/EmployeeManager';



export const LocationForm = () => {
    const [location, setLocation] = useState({
        name: "",
        address: "",
        animalId: 0,
        employeeId: 0
    });

    const [isLoading, setIsLoading] = useState(false);
    const [animals, setAnimals] = useState([]);
    const [employees, setEmployees] = useState([]);
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newLocation = { ...location }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newLocation[event.target.id] = selectedVal
        setLocation(newLocation)

    }

    useEffect(() => {
        getAllAnimals()
            .then(animalsFromAPI => {
                setAnimals(animalsFromAPI)
            });
    }, []);

    useEffect(() => {
        getAllEmployees()
            .then(employeesFromAPI => {
                console.log(employeesFromAPI)
                setEmployees(employeesFromAPI)
            });
    }, []);

    const handleClickSaveLocation = (event) => {
        event.preventDefault()

        const animalId = location.animalId
        const employeeId = location.employeeId

        if (animalId === 0 || employeeId === 0) {
            window.alert("Please select an animal and an employee")
        }

        else {
            addLocation(location)
                .then(() => history.push("/locations"))
        }
    }

    return (
        <form className="locationForm">
            <h2 className="locationFrom_title">New Location</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Location name: </label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location name" value={location.name} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Location address: </label>
                    <input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location address" value={location.address} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="animal">Animal: </label>
                    <select value={location.animalId} name="animalId" id="animalId" onChange={handleControlledInputChange} className="form-control">
                        <option value="0">Select an animal</option>
                        {animals.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="employee">Employee: </label>
                    
                    <select value={location.employeeId} name="employeeId" id="employeeId" onChange={handleControlledInputChange} className="form-control">
                        <option value="0">Select an employee</option>
                       
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                        
                    
                    </select>
                </div>
            </fieldset>

            <button className="btn btn-primary"
                onClick={handleClickSaveLocation}>
                SaveLocation
                    </button>
        </form>
    )
}