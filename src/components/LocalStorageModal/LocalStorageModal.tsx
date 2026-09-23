import * as React from "react";
import useLocalStorageModal from "./useLocalStorageModal";
import "./LocalStorageModal.css";

export type LocalStorageModalProps = {
    colorTheme: string;
    showSaveModal: boolean;
    setShowSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
    savedQueries: Map<string, string>;
    setSavedQueries: React.Dispatch<React.SetStateAction<Map<string, string>>>;
};

const LocalStorageModal = (props: LocalStorageModalProps) => {
    const { colorTheme, showSaveModal } = props;

    const {
        saveName,
        handleClose,
        handleChange,
        handleSave,
    } = useLocalStorageModal(props);

    return (
        <div id="local-storage-modal" className={showSaveModal ? "open" : ""}>
            <div id="local-storage">
                <button className="close icon-button" onClick={handleClose}>
                    <img className="close-button-img" src={`/icons/close-${colorTheme}.svg`} />
                </button>
                <div id="save-to-local">
                    <h2>Save to Local Storage</h2>
                    <p>Enter a name to save the current set of locations to your browser&apos;s local storage.</p>
                    <form id="save-form" onSubmit={handleSave}>
                        <input id="save-name" className={colorTheme} type="text" value={saveName} onChange={handleChange} />
                        <button id="save-button" className="text-icon-button" type="submit">
                            <img className="icon" src={`/icons/save-${colorTheme}.svg`} />
                            <p className="button-text">Save</p>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LocalStorageModal;
