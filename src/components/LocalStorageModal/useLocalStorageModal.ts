import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { LocalStorageModalProps } from "./LocalStorageModal";

const useLocalStorageModal = (props: LocalStorageModalProps) => {
    const [ saveName, setSaveName ] = useState("");
    const [ searchParams ] = useSearchParams();

    const {
        setShowSaveModal,
        savedQueries,
        setSavedQueries,
    } = props;

    useEffect(() => {
        const queriesJson = localStorage.getItem("savedQueries");
        if (queriesJson) {
            const queriesMap = new Map<string, string>(Object.entries(JSON.parse(queriesJson)));
            setSavedQueries(queriesMap);
        };
    }, []);

    const handleClose = () => {
        setShowSaveModal(false);
        setSaveName("");
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const filtered = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
        setSaveName(filtered);
    };

    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newMap = new Map(savedQueries);
        newMap.set(saveName, searchParams.toString());

        const queriesJson = JSON.stringify(Object.fromEntries(newMap));
        localStorage.setItem("savedQueries", queriesJson);

        setSavedQueries(newMap);
        setShowSaveModal(false);
    };

    return {
        saveName,
        handleClose,
        handleChange,
        handleSave,
    };
};

export default useLocalStorageModal;
