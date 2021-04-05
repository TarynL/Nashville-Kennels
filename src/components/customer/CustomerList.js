import React, {useState, useEffect} from 'react';
import {CustomerCard} from './Customer';
import {getAllCustomers, deleteCustomer } from '../../modules/CustomerManager';


export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    const getCustomers = () => {
        return getAllCustomers()
        .then (customersFromAPI => {
            setCustomers(customersFromAPI)
        });
    };

    useEffect(() => {
        getCustomers();
    }, []);

    const handleDeleteCustomer = (id) => {
        deleteCustomer(id)
        .then(() => getAllCustomers()
        .then(setCustomers));
    }

    return (
        <div className="container-cards">
          {customers.map(customer =>
            <CustomerCard key={customer.id} customer={customer} handleDeleteCustomer={handleDeleteCustomer} />
          )}
        </div>
    )
}