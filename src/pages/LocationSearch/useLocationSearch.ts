import { ChangeEvent, FormEvent, useState } from "react";
import { ApiService, SearchLocationResult } from "~services/ApiService";

const useLocationSearch = () => {
    const apiService = new ApiService();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ query, setQuery ] = useState("");
    const [ results, setResults ] = useState<SearchLocationResult[] | null>(null);
    const [ selections, setSelections ] = useState<SearchLocationResult[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        await apiService.searchLocation(query)
            .then((searchResults) => {
                setResults(searchResults);
            });
        setIsLoading(false);
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
        selections.forEach((selection) => {
            const query = selection.FullName.replace("#", "");
            queries.push(query);
        });
        return `q=${queries.join("&q=")}`;
    };

    return {
        isLoading,
        query,
        results,
        selections,
        handleChange,
        handleSearch,
        handleAdd,
        handleRemove,
        getQueries,
    };
};

export default useLocationSearch;
