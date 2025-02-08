import * as React from "react";
import { Link } from "react-router";
import useLocationSearch from "./useLocationSearch";

const LocationSearch = () => {
    const {
        query,
        results,
        selections,
        handleChange,
        handleSearch,
        handleAdd,
        handleRemove,
        getQueries,
    } = useLocationSearch();

    return (
        <div id="location-search">
            <h2 id="search-header">Search Locations</h2>
            <form id="search-form" onSubmit={handleSearch}>
                <input id="location-query" type="text" value={query} onChange={handleChange} />
                <button id="search-button" type="submit">Search</button>
            </form>
            {results && (results.length > 0 ? results.map((result, index) => {
                    const key = `SearchResult${index}`;
                    return (<div className="search-result" key={key}>
                        <button onClick={() => handleAdd(result)}>{result.FullName}</button>
                    </div>);
                }) : 
            <p className="error">No results for search query</p>)}
            <h2 id="selected-header">Selected Locations</h2>
            {selections.map((location, index) => {
                const key = `SelectedLocations${index}`;
                return (<div className="selected-location" key={key}>
                    <p>{location.FullName}</p>
                    <button className="remove-button" onClick={() => handleRemove(index)}>X</button>
                </div>);
            })}
            <div id="continue-button">
                <Link to={`/current?${getQueries()}`}>
                    <button disabled={selections.length == 0}>Continue</button>
                </Link>
            </div>
        </div>
    );
};

export default LocationSearch;
