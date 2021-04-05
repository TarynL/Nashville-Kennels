import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { AnimalList } from "./animal/AnimalList";
import { LocationCard } from "./location/Location";
import { EmployeeCard } from "./employee/Employee";
import { CustomerCard } from "./customer/Customer";


export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <Route exact path="/animals">
              <AnimalList />
            </Route>

            <Route path="/locations">
                <LocationCard />
            </Route>

            <Route path="/employees">
                <EmployeeCard />
            </Route>

            <Route path="/customers">
                <CustomerCard />
            </Route>
        </>
    )
};