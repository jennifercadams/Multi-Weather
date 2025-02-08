import * as React from "react";
import useLocationSearch from "./useLocationSearch";
import SearchForm from "~components/SearchForm";
import SelectedLocations from "~components/SelectedLocations";

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

    const searchFormProps = { query, results, handleChange, handleSearch, handleAdd };
    const selectedLocationsProps = { selections, handleRemove, getQueries };

    return (
        <div id="location-search">
            <SearchForm {...searchFormProps} />
            <SelectedLocations {...selectedLocationsProps} />
        </div>
    );
};

export default LocationSearch;
