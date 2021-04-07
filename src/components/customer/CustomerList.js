import React, {useState, useEffect} from 'react';
import {CustomerCard} from './Customer';
import {getAllCustomers, deleteCustomer } from '../../modules/CustomerManager';
import { useHistory } from 'react-router-dom';

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const history = useHistory();

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
        <>
      <section className="section-content">
        <button type="button"
          className="btn"
          onClick={() => { history.push("/customers/create") }}>
          Admit Customer
        </button>
      </section>

        <div className="container-cards">
          {customers.map(customer =>
            <CustomerCard key={customer.id} customer={customer} handleDeleteCustomer={handleDeleteCustomer} />
          )}
        </div>
        </>
    );
};