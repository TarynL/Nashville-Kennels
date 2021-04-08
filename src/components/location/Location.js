import React from "react";
import "./Location.css";
import { Link, useHistory } from "react-router-dom";

export const LocationCard = ({ location, handleDeleteLocation }) => {
  const history = useHistory();
  
  return (
    <div className="card">
      <div className="card-content">

        <h3>Name: <span className="card-locationName">
          {location.name}
        </span></h3>
        <p>Address: {location.address}</p>
        <Link to={`/locations/${location.id}`}>
          <button>Details</button>
        </Link>
        <button type="button"
          onClick={() => history.push(`/locations/${location.id}/edit`)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteLocation(location.id)}>Close Location</button>
      </div>
    </div>
  );
}