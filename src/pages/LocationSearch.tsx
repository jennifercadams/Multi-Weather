import * as React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router";
import { ApiService, SearchLocationResult } from "~services/ApiService";

const LocationSearch = () => {
    const apiService = new ApiService();
    const [ query, setQuery ] = useState("");
    const [ results, setResults ] = useState<SearchLocationResult[] | null>(null);
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
        setResults(null);
    };

    const handleRemove = (index: number) => {
        setSelections([...selections.slice(0, index), ...selections.slice(index + 1)]);
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
