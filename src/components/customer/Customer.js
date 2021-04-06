import React from "react";
import "./Customer.css";
import { Link } from "react-router-dom";

export const CustomerCard = ({ customer, handleDeleteCustomer }) => {
    return (
      <div className="card">
        <div className="card-content">
          
          <h3>Name: <span className="card-customerName">
            {customer.name}
          </span></h3>
          <p>Address: {customer.address}</p>
          <Link to={`/customers/${customer.id}`}>
            <button>Details</button>
          </Link>
          <button type="button" onClick={() => handleDeleteCustomer(customer.id)}>Remove</button>
        </div>
      </div>
    );
  }