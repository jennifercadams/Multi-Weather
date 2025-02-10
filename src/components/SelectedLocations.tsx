import * as React from "react";
import { Link } from "react-router";
import { SearchLocationResult } from "~services/ApiService";

export type SelectedLocationsProps = {
    selections: SearchLocationResult[];
    handleRemove: (arg: number) => void;
    getQueries: () => string;
};

const SelectedLocations = (props: SelectedLocationsProps) => {
    const {
        selections,
        handleRemove,
        getQueries,
    } = props;

    return (
        <div id="selected-locations">
            <h2 id="selected-header">Selected Locations</h2>
            {selections.map((location, index) => {
                const key = `SelectedLocations${index}`;
                return (<div className="selected-location" key={key}>
                    <p>{location.FullName}</p>
                    <button className="remove-button" onClick={() => handleRemove(index)}>X</button>
                </div>);
            })}
            <div id="continue-button">
                <Link to={`/current/?${getQueries()}`}>
                    <button disabled={selections.length == 0}>Continue</button>
                </Link>
            </div>
        </div>
    );
};

export default SelectedLocations;
