import * as React from "react";
import { Link } from "react-router";
import { SearchLocationResult } from "~services/ApiService";
import "./SelectedLocations.css";

export type SelectedLocationsProps = {
    colorTheme: string;
    selections: SearchLocationResult[];
    handleRemove: (arg: number) => void;
    getQueries: () => string;
};

const SelectedLocations = (props: SelectedLocationsProps) => {
    const {
        colorTheme,
        selections,
        handleRemove,
        getQueries,
    } = props;

    return (
        <div id="selected-locations" className="location-search-step">
            <div>
                <h2 id="selected-header">Selected Locations</h2>
                {selections.length > 0 &&
                selections.map((location, index) => {
                    const key = `SelectedLocations${index}`;
                    return (<div className="selected-location" key={key}>
                        <p>{location.FullName}</p>
                        <button className="icon-button" onClick={() => handleRemove(index)}>
                            <img className="icon-button-img" src={`/icons/trash-can-${colorTheme}.svg`} />
                        </button>
                    </div>);
                })}
                {selections.length == 0 &&
                <p className="error">No locations selected.</p>}
            </div>
            <div id="continue-button">
                <Link to={`/current?${getQueries()}`}>
                    <button disabled={selections.length == 0}>Continue</button>
                </Link>
            </div>
        </div>
    );
};

export default SelectedLocations;
