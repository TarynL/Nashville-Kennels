import React, { useState, useEffect } from 'react';
import { getEmployeeById, deleteEmployee } from '../../modules/EmployeeManager';
import './EmployeeDetail.css';
import { useParams, useHistory } from "react-router-dom";

export const EmployeeDetail = () => {
    const [employee, setEmployee] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { employeeId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getEmployeeById(employeeId)
            .then(employee => {
                setEmployee({
                    name: employee.name,
                    location: employee.location,
                    animal: employee.animal
                });
                setIsLoading(false);
            });
    }, [employeeId]);

    const handleDelete = () => {
        setIsLoading(true);
        deleteEmployee(employeeId)
        .then(() => 
        history.push("./employees")
        );
    };

    return (
        <section className="employee card">
            <h3 className="employee__name">{employee.name}</h3>
            <div className="employee__location">Location: {employee.location}</div>
            <div className="employee__animal">Cared for: {employee.animal?.name}</div>
           <button type="button" disabled={isLoading} onClick={handleDelete}>
               Delete</button> 
        </section>
    );
}