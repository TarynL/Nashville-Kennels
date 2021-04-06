import React from "react";
import "./Employee.css";
import { Link } from "react-router-dom";

export const EmployeeCard = ({ employee, handleDeleteEmployee }) => {
  return (
    <div className="card">
      <div className="card-content">

        <h3>Name: <span className="card-employeeName">
          {employee.name}
        </span></h3>
        <p>Location: {employee.location}</p>
        <Link to={`/employees/${employee.id}`}>
          <button>Details</button>
        </Link>
        <button type="button" onClick={() => handleDeleteEmployee(employee.id)}>Terminate</button>
      </div>
    </div>
  );
}