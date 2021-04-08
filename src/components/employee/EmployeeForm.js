import React, { useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import{addEmployee} from '../../modules/EmployeeManager';
import{getAllAnimals} from '../../modules/AnimalManager';
import {getAllLocations} from '../../modules/LocationManager';
import './EmployeeForm.css';

export const EmployeeForm = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        locationId: 0,
        animalId: 0
    });

    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [animals, setAnimals] = useState([]);
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newEmployee = {...employee}
        let selectedVal = event.target.value
        if(event.target.id.includes("Id")){
            selectedVal = parseInt(selectedVal)
        }
         newEmployee[event.target.id] = selectedVal
         setEmployee(newEmployee)
    }

    useEffect (() => {
        getAllAnimals()
        .then(animalsFromAPI => {
            setAnimals(animalsFromAPI)
        }
        );
    }, []);

    useEffect (() => {
        getAllLocations()
        .then(locationsFromAPI => {
            setLocations(locationsFromAPI)
        }
        );
    }, []);

    const handleClickSaveEmployee = (event) => {
        event.preventDefault()
        const animalId = employee.animalId
        const locationId = employee.locationId

        if(animalId === 0 || locationId === 0){
            window.alert("Please select a location and an animal")
        } else {
            addEmployee(employee)
            .then(() => history.push("/employees") )
        }
    }
    
    return (
        <form className="employeeForm">
			<h2 className="employeeForm__title">New Employee</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Employee name: </label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="email">Email: </label>
					<input type="text" id="email" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Email" value={employee.email} />
				</div>
			</fieldset>

            <fieldset>
				<div className="form-group">
					<label htmlFor="location">Location: </label>
					<select value={employee.locationId} name="locationId" id="locationId" onChange={handleControlledInputChange} className="form-control" >
						<option value="0">Select a location</option>
						{locations.map(l => (
							<option key={l.id} value={l.id}>
								{l.name}
							</option>
						))}
					</select>
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="animal">Cares for: </label>
					<select value={employee.animalId} name="animalId" id="animalId" onChange={handleControlledInputChange} className="form-control" >
						<option value="0">Select an animal</option>
						{animals.map(a => (
							<option key={a.id} value={a.id}>
								{a.name}
							</option>
						))}
					</select>
				</div>
			</fieldset>
            <button className="btn btn-primary"
				onClick={handleClickSaveEmployee}>
				Save Employee
          </button>
		</form>
    )
};
