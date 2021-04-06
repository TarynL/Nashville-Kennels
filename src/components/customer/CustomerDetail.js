import React, {useState, useEffect } from 'react';
import './CustomerDetail.css';
import {useParams, useHistory} from "react-router-dom";
import {getCustomerById} from '../../modules/CustomerManager';


export const CustomerDetail = () => {
    const [customer, setCustomer] = useState({});

    const {customerId} = useParams();
    const history = useHistory();

    useEffect(() => {
        getCustomerById(customerId)
        .then(customer => {
            setCustomer({
                name: customer.name,
                address: customer.address,
                animal: customer.animal
            });
        });
    }, [customerId]);

    return (
        <section className="customer">
          <h3 className="customer__name">{customer.name}</h3>
          <div className="customer__address">Address: {customer.address}</div>
          <div className="customer__animal">Pet Name: {customer.animal?.name}</div>
        
        </section>
      );
}