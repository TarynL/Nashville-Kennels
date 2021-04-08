import React, { useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import{addCustomer} from '../../modules/CustomerManager';
import{getAllAnimals} from '../../modules/AnimalManager';
import './CustomerForm.css';

export const CustomerForm = () => {
    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        email: "",
        animalId: 0
    });

    const [isLoading, setIsLoading] = useState(false);
    const [animals, setAnimals] = useState([]);
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newCustomer = {...customer}
        let selectedVal = event.target.value
        if(event.target.id.includes("Id")){
            selectedVal = parseInt(selectedVal)
        }
        newCustomer[event.target.id] = selectedVal
         setCustomer(newCustomer)
    }

    useEffect (() => {
        getAllAnimals()
        .then(animalsFromAPI => {
            setAnimals(animalsFromAPI)
        }
        );
    }, []);

    const handleClickSaveCustomer = (event) => {
        event.preventDefault()
        const animalId = customer.animalId

        if(animalId === 0){
            window.alert("Please select an animal")
        } else {
            addCustomer(customer)
            .then(() => history.push("/customers") )
        }
    }
    
    return (
        <form className="customerForm">
			<h2 className="customerForm__title">New Customer</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Customer name: </label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Customer name" value={customer.name} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="address">Address: </label>
					<input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Address" value={customer.address} />
				</div>
			</fieldset>

            <fieldset>
				<div className="form-group">
					<label htmlFor="email">Email: </label>
					<input type="text" id="email" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Email" value={customer.email} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="animal">Pets name: </label>
					<select value={customer.animalId} name="animalId" id="animalId" onChange={handleControlledInputChange} className="form-control" >
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
				onClick={handleClickSaveCustomer}>
				Save Customer
          </button>
		</form>
    )
};
