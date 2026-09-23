import * as React from "react";
import SearchForm from "~components/SearchForm/SearchForm";
import SelectedLocations from "~components/SelectedLocations/SelectedLocations";
import useLocationSearch from "./useLocationSearch";
import "./LocationSearch.css";

const LocationSearch = () => {
    const {
        colorTheme,
        isLoading,
        query,
        results,
        error,
        selections,
        handleChange,
        handleSearch,
        handleAdd,
        handleRemove,
        getQueries,
    } = useLocationSearch();


    const searchFormProps = { colorTheme, isLoading, query, results, error, handleChange, handleSearch, handleAdd };
    const selectedLocationsProps = { colorTheme, selections, handleRemove, getQueries };

    return (
        <div id="location-search">
            <SearchForm {...searchFormProps} />
            <SelectedLocations {...selectedLocationsProps} />
        </div>
    );
};

export default LocationSearch;
