import * as React from "react";
import { useOutletContext } from "react-router";
import useLocationSearch from "./useLocationSearch";
import SearchForm from "~components/SearchForm/SearchForm";
import SelectedLocations from "~components/SelectedLocations/SelectedLocations";
import "./LocationSearch.css";

const LocationSearch = () => {
    const {
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

    const [ colorTheme ]: string[] = useOutletContext();

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
