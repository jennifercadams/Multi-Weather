import * as React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router";
import { ApiService, SearchLocationResult } from "~services/ApiService";

const LocationSearch = () => {
    const apiService = new ApiService();
    const [ query, setQuery ] = useState("");
    const [ results, setResults ] = useState<SearchLocationResult[]>([]);
    const [ selections, setSelections ] = useState<SearchLocationResult[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await apiService.searchLocation(query)
            .then((searchResults) => {
                setResults(searchResults);
            });
    };

    const handleAdd = (location: SearchLocationResult) => {
        setSelections([...selections, location]);
        setQuery("");
        setResults([]);
    };
    
    const getQueries = () => {
        const queries: string[] = [];
        selections.forEach((selection) => {;
            queries.push(selection.FullName);
        });
        return `q=${queries.join("&q=")}`;
    };

    return (
        <div>
            <h2>Search Locations</h2>
            <form onSubmit={handleSearch}>
                <input id="location-query" type="text" value={query} onChange={handleChange} />
                <button id="search-button" type="submit">Search</button>
            </form>
            {results.map((result, index) => {
                const key = `SearchResult${index}`;
                return (<div className="search-result" key={key}>
                    <button onClick={() => handleAdd(result)}>{result.FullName}</button>
                </div>);
            })}
            <h2>Selected Locations</h2>
            {selections.map((location, index) => {
                const key = `SelectedLocations${index}`;
                return (<div className="selected-location" key={key}>
                    <p>{location.FullName}</p>
                </div>);
            })}
            <Link to={`/current?${getQueries()}`}>
                <button id="continue-button" disabled={selections.length == 0}>Continue</button>
            </Link>
        </div>
    );
};

export default LocationSearch;
