import * as React from "react";
import { SearchLocationResult } from "~services/ApiService";
import "./SearchForm.css";

export type SearchFormProps = {
    colorTheme: string;
    isLoading: boolean;
    query: string;
    results: SearchLocationResult[] | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleAdd: (arg: SearchLocationResult) => void;
}

const SearchForm = (props: SearchFormProps) => {
    const {
        colorTheme,
        isLoading,
        query,
        results,
        handleChange,
        handleSearch,
        handleAdd,
    } = props;

    return (
        <div id="search-form-container" className="location-search-step">
            <h2 id="search-header">Search Locations</h2>
            <p id="search-form-description">Search for locations using postal code, place name, or latitude and longitude.</p>
            <form id="search-form" onSubmit={handleSearch}>
                <input id="location-query" className={colorTheme} type="text" value={query} onChange={handleChange} />
                <button id="search-button" type="submit" disabled={isLoading}>
                    {!isLoading && <img className="icon" src={`/icons/magnifying-glass-${colorTheme}.svg`} />}
                    {isLoading && <img className="icon spinner" src={`/icons/spinner-${colorTheme}.svg`} />}
                    <p id="search-button-text">Search</p>
                </button>
            </form>
            <div id="search-results-container">
                {results && <div id="search-results">
                    {(results.length > 0 ? results.map((result, index) => {
                        const key = `SearchResult${index}`;
                        return (<button key={key} onClick={() => handleAdd(result)}>{result.FullName}</button>);
                    }) : 
                    <p className="error">No results for search query.</p>)}
                </div>}
                <p id="loading-message" className={isLoading ? "loading" : ""}>
                    <img className="icon" src={`/icons/warning-${colorTheme}.svg`} />
                    Connecting to server. Loading may take up to a minute for the first request.
                </p>
            </div>
        </div>
    );
};

export default SearchForm;
