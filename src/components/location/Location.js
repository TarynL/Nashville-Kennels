import React from "react";
import "./Location.css";

export const LocationCard = ({ location, handleDeleteLocation }) => {
    return (
      <div className="card">
        <div className="card-content">
          
          <h3>Name: <span className="card-locationName">
            {location.name}
          </span></h3>
          <p>Address: {location.address}</p>
          <button type="button" onClick={() => handleDeleteLocation(location.id)}>Close Location</button>
        </div>
      </div>
    );
  }