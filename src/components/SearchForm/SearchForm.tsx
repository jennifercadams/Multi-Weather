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
        <div id="search-form-container">
            <h2 id="search-header">Search Locations</h2>
            <p>Search for locations using postal code, place name, or latitude and longitude.</p>
            <form id="search-form" onSubmit={handleSearch}>
                <input id="location-query" type="text" value={query} onChange={handleChange} />
                <button id="search-button" type="submit" disabled={isLoading}>Search</button>
                {isLoading && <LoadingSpinner />}
            </form>
            {results && (results.length > 0 ? results.map((result, index) => {
                const key = `SearchResult${index}`;
                return (<div className="search-result" key={key}>
                    <button onClick={() => handleAdd(result)}>{result.FullName}</button>
                </div>);
            }) : 
            <p className="error">No results for search query.</p>)}
        </div>
    );
};

export default SearchForm;
