import React, {useState, useEffect} from "react";
import {updateCustomer, getCustomerById} from "../../modules/CustomerManager";
import "./CustomerForm.css";
import { useHistory, useParams} from 'react-router-dom';
import { getAllAnimals} from '../../modules/AnimalManager';

export const CustomerEditForm = () => {
    const [customer, setCustomer] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const {customerId} = useParams();
    const history = useHistory();

    const [animals, setAnimals] = useState([]);

    const handleFieldChange = event => {
        const stateToChange = {...customer};
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }

        stateToChange[event.target.id] = selectedVal
        setCustomer(stateToChange);
    };

    const updateExistingCustomer = event => {
        event.preventDefault()
        setIsLoading(true);

        const editedCustomer = {
            id: customerId,
            name: customer.name,
            address: customer.address,
            email: customer.email,
            animalId: customer.animalId
        };

        const animalId = customer.animalId

        if(animalId === 0){
            window.alert("Please select an animal")
        }
        else{
            updateCustomer(editedCustomer)
            .then(() => history.push("/customers"))
        }
    }

    useEffect(() => {
        getCustomerById(customerId)
        .then(customer => {
            setCustomer(customer);
            setIsLoading(false);
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
                            value={customer.name}
                        />
                        <label htmlFor="name">Customer name</label>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="address"
                            value={customer.address}
                        />
                        <label htmlFor="address">Address</label>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="email"
                            value={customer.email}
                        />
                        <label htmlFor="email">Email</label>


					<select 
                    value={customer.animalId} 
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
                    <label htmlFor="animalId">Pet</label>

                    </div>
                    <div className="alignRight">
                        <button
                            type="button" disabled={isLoading}
                            onClick={updateExistingCustomer}
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>

);
}

