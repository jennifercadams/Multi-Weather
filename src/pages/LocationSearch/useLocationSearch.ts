import { ChangeEvent, FormEvent, useState } from "react";
import { ApiService, SearchLocationResult } from "~services/ApiService";

const useLocationSearch = () => {
    const apiService = new ApiService();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ query, setQuery ] = useState("");
    const [ results, setResults ] = useState<SearchLocationResult[] | null>(null);
    const [ error, setError ] = useState("");
    const [ selections, setSelections ] = useState<SearchLocationResult[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError("");
        setQuery(event.target.value);
    };

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResults(null);

        if (!query) {
            setError("Please enter search query.");
            return;
        }

        setError("");
        setIsLoading(true);
        await apiService.searchLocation(query)
            .then((searchResults) => {
                if (searchResults.Results) {
                    if (searchResults.Results.length > 0)
                        setResults(searchResults.Results);
                    else
                        setError("No results found for search query.");
                }

                if (searchResults.Error)
                    setError(searchResults.Error);
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
        error,
        selections,
        handleChange,
        handleSearch,
        handleAdd,
        handleRemove,
        getQueries,
    };
};

export default useLocationSearch;
