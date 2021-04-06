import React, { useState, useEffect } from 'react';
import { getLocationById } from '../../modules/LocationManager';
import './LocationDetail.css';
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
  const [location, setLocation] = useState({ });

  const {locationId} = useParams();
  const history = useHistory();

  useEffect(() => {
    getLocationById(locationId)
      .then(location => {
        setLocation({
          name: location.name,
          address: location.address,
          animal: location.animal,
          employee: location.employee
        });
      });
  }, [locationId]);

  return (
    <section className="location">
      <h3 className="location__name">{location.name}</h3>
      <div className="location__address">Address: {location.address}</div>
      <div className="location__animal">Home to: {location.animal?.name}</div>
      <div className="location__employee">Works with us: {location.employee?.name}</div>
    </section>
  );
}