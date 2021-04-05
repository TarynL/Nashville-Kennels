import React from "react";
import "./Employee.css";

export const EmployeeCard = ({ employee }) => {
    return (
      <div className="card">
        <div className="card-content">
          
          <h3>Name: <span className="card-employeeName">
            {employee.name}
          </span></h3>
          <p>Location: {employee.location}</p>
        </div>
      </div>
    );
  }