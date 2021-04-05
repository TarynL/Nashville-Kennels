import React from "react";
import "./Customer.css";

export const CustomerCard = ({ customer }) => {
    return (
      <div className="card">
        <div className="card-content">
          
          <h3>Name: <span className="card-customerName">
            {customer.name}
          </span></h3>
          <p>Address: {customer.address}</p>
        </div>
      </div>
    );
  }