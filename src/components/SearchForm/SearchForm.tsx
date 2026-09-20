import * as React from "react";
import LoadingSpinner from "~components/LoadingSpinner/LoadingSpinner";
import { SearchLocationResult } from "~services/ApiService";
import "./SearchForm.css";

export type SearchFormProps = {
    isLoading: boolean;
    query: string;
    results: SearchLocationResult[] | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleAdd: (arg: SearchLocationResult) => void;
}

const SearchForm = (props: SearchFormProps) => {
    const {
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
            <p>Search for locations using postal code, place name, or latitude and longitude.</p>
            <form id="search-form" onSubmit={handleSearch}>
                <input id="location-query" type="text" value={query} onChange={handleChange} />
                <button id="search-button" type="submit" disabled={isLoading}>
                    <img className="magnifying-glass" src="/icons/magnifying-glass.svg" />
                    Search
                </button>
                <LoadingSpinner isLoading={isLoading} />
            </form>
            <div id="search-results">
                {results && (results.length > 0 ? results.map((result, index) => {
                    const key = `SearchResult${index}`;
                    return (<button key={key} onClick={() => handleAdd(result)}>{result.FullName}</button>);
                }) : 
                <p className="error">No results for search query.</p>)}
            </div>
        </div>
    );
};

export default SearchForm;
