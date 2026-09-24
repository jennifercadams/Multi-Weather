import { ChangeEvent, FormEvent, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { LocalStorageModalProps } from "./LocalStorageModal";

const useLocalStorageModal = (props: LocalStorageModalProps) => {
    const unexpectedError = "An unexpected error occurred. Please try again.";
    const [ saveName, setSaveName ] = useState("");
    const [ error, setError ] = useState("");
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    const {
        setShowSaveModal,
        setShowLoadModal,
        savedQueries,
        setSavedQueries,
    } = props;

    useLayoutEffect(() => {
        setSaveName("");
        setError("");
    }, [location.pathname]);

    useEffect(() => {
        const queriesJson = localStorage.getItem("savedQueries");
        if (queriesJson) {
            const queriesMap = new Map<string, string>(Object.entries(JSON.parse(queriesJson)));
            setSavedQueries(queriesMap);
        };
    }, []);

    const handleClose = () => {
        setShowSaveModal(false);
        setShowLoadModal(false);
        setSaveName("");
        setError("");
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const filtered = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
        setSaveName(filtered);
        setError("");
    };

    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!saveName) {
            setError("Please enter a name.");
            return;
        }

        try {
            const newMap = new Map(savedQueries);
            newMap.set(saveName, searchParams.toString());

            const queriesJson = JSON.stringify(Object.fromEntries(newMap));
            localStorage.setItem("savedQueries", queriesJson);

            setSavedQueries(newMap);
            setShowSaveModal(false);
            setSaveName("");
            setError("");
        } catch (error) {
            console.error("Error saving query:", error);
            setError(unexpectedError);
        }
    };

    const handleLoad = (queryName: string) => {
        const query = savedQueries.get(queryName);
        if (!query) {
            setError(unexpectedError);
            return;
        }

        try {
            navigate({ pathname: "/current", search: query }, { replace: location.pathname == "/current" });
            setShowLoadModal(false);
            setError("");
        } catch (error) {
            console.error("Error loading query:", error);
            setError(unexpectedError);
        }
    };

    const handleDelete = (queryName: string) => {
        try {
            const newMap = new Map(savedQueries);
            newMap.delete(queryName);

            const queriesJson = JSON.stringify(Object.fromEntries(newMap));
            localStorage.setItem("savedQueries", queriesJson);

            setSavedQueries(newMap);
        } catch (error) {
            console.error("Error deleting query:", error);
            setError(unexpectedError);
        }
    };

    return {
        saveName,
        savedQueries,
        error,
        handleClose,
        handleChange,
        handleSave,
        handleLoad,
        handleDelete,
    };
};

export default useLocalStorageModal;
