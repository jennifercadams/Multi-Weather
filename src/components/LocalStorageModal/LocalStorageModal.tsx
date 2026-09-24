import * as React from "react";
import useLocalStorageModal from "./useLocalStorageModal";
import "./LocalStorageModal.css";

export type LocalStorageModalProps = {
    colorTheme: string;
    showSaveModal: boolean;
    setShowSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
    showLoadModal: boolean;
    setShowLoadModal: React.Dispatch<React.SetStateAction<boolean>>;
    savedQueries: Map<string, string>;
    setSavedQueries: React.Dispatch<React.SetStateAction<Map<string, string>>>;
};

const LocalStorageModal = (props: LocalStorageModalProps) => {
    const { colorTheme, showSaveModal, showLoadModal } = props;

    const {
        saveName,
        savedQueries,
        error,
        handleClose,
        handleChange,
        handleSave,
        handleLoad,
        handleDelete,
    } = useLocalStorageModal(props);

    const queryNames = Array.from(savedQueries.keys());

    return (
        <div id="local-storage-modal" className={showSaveModal || showLoadModal ? "open" : ""}>
            <div id="local-storage">
                <button className="close icon-button" onClick={handleClose}>
                    <img className="close-button-img" src={`/icons/close-${colorTheme}.svg`} />
                </button>
                {showSaveModal && <div id="save-to-local">
                    <h2>Save to Local Storage</h2>
                    <p>Enter a name to save the current set of locations to your browser&apos;s local storage.</p>
                    <form id="save-form" onSubmit={handleSave}>
                        <input id="save-name" className={colorTheme} type="text" value={saveName} onChange={handleChange} />
                        <button id="save-button" className="text-icon-button" type="submit">
                            <img className="icon" src={`/icons/save-${colorTheme}.svg`} />
                            <p className="button-text">Save</p>
                        </button>
                    </form>
                    <p className="error">{error}</p>
                </div>}
                {showLoadModal && <div id="load-from-local">
                    <h2>Local Storage</h2>
                    <p>Load or delete saved location sets from your browser&apos;s local storage.</p>
                    <p className="error">{error}</p>
                    {queryNames.map((query, index) => {
                        return (
                            <div className="saved-query" key={`query-${index}`}>
                                <p className="query-name">{query}</p>
                                <div className="buttons">
                                    <button id="load-button" className="icon-button" onClick={() => handleLoad(query)}>
                                        <img className="icon-button-img" src={`/icons/file-import-${colorTheme}.svg`} />
                                    </button>
                                    <button id="delete-button" className="icon-button" onClick={() => handleDelete(query)}>
                                        <img className="icon-button-img" src={`/icons/trash-can-${colorTheme}.svg`} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>}
            </div>
        </div>
    );
};

export default LocalStorageModal;
