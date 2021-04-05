import React, {useState, useEffect} from 'react';
import { LocationCard } from './Location';
import { getAllLocations} from '../../modules/LocationManager';

export const LocationList = () => {
    const [locations, setLocations] = useState([]);

    const getLocations = () => {
        return getAllLocations()
        .then(locationsFromAPI => {
            console.log(locationsFromAPI)
            setLocations(locationsFromAPI)
        });
    };

    useEffect(() => {
        getLocations();
    }, []);

    return(
        <div className="container-cards">
          {locations.map(location =>
            <LocationCard key={location.id} location={location} />
          )}
        </div>
      );
    };