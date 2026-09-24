import * as React from "react";
import { Outlet } from "react-router";
import LocalStorageModal, { LocalStorageModalProps } from "~components/LocalStorageModal/LocalStorageModal";
import { PageContextType, PageContext } from "./usePageContext";
import usePageLayout from "./usePageLayout";
import "./PageLayout.css";

export type PageLayoutProps = {
    showActionButtons: boolean;
};

const PageLayout = (props: PageLayoutProps) => {
    const {
        colorTheme,
        showSaveModal,
        setShowSaveModal,
        showLoadModal,
        setShowLoadModal,
        savedQueries,
        setSavedQueries,
        showActionButtons,
        handleCopyToClipboard,
        handleSaveLocal,
        handleLoadLocal,
        handleToggleTheme,
    } = usePageLayout(props);

    const localStorageModalProps: LocalStorageModalProps = {
        colorTheme,
        showSaveModal,
        setShowSaveModal,
        showLoadModal,
        setShowLoadModal,
        savedQueries,
        setSavedQueries,
    };

    const pageContext: PageContext = { colorTheme, handleLoadLocal };

    return (
        <div id="page">
            <div id="main">
                <div id="header">
                    <h1>MultiWeather</h1>
                    <div id="action-buttons">
                        {showActionButtons && <>
                            <button id="copy" className="icon-button tooltip" onClick={handleCopyToClipboard}>
                                <img className="icon-button-img" src={`/icons/copy-${colorTheme}.svg`} />
                                <span className="tooltip-text hover">Copy permalink</span>
                                <span className="tooltip-text active">
                                    <img className="tooltip-icon" src={`/icons/checkmark-${colorTheme}.svg`} />
                                    Copied
                                </span>
                            </button>
                            <button id="save" className="icon-button tooltip" onClick={handleSaveLocal}>
                                <img className="icon-button-img" src={`/icons/save-${colorTheme}.svg`} />
                                <span className="tooltip-text hover">Save to local</span>
                            </button>
                        </>}
                        <button id="load" className="icon-button tooltip" onClick={handleLoadLocal}>
                            <img className="icon-button-img" src={`/icons/folder-${colorTheme}.svg`} />
                            <span className="tooltip-text hover">Load from local</span>
                        </button>
                        <button id="theme-toggle" className="tooltip" onClick={handleToggleTheme}>
                            <div id="theme-toggle-bg" className={colorTheme} />
                            <img id="light-icon" className={colorTheme} src={`/icons/sun-light.svg`}></img>
                            <img id="dark-icon" className={colorTheme} src={`/icons/moon-dark.svg`}></img>
                            <div id="theme-toggle-slider" className={colorTheme} />
                            <span className="tooltip-text hover">Toggle theme</span>
                        </button>
                    </div>
                </div>
                <Outlet context={{ pageContext } satisfies PageContextType} />
            </div>
            <LocalStorageModal {...localStorageModalProps} />
            <div id="footer">
                <p id="weather-api-credit">Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></p>
            </div>
        </div>
    );
};

export default PageLayout;
