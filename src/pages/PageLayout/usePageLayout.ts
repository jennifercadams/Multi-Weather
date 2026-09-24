import * as React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { PageLayoutProps } from "./PageLayout";

const themes = [ "dark", "light" ];

const usePageLayout = (props: PageLayoutProps) => {
    const localTheme = localStorage.getItem("theme");
    const initialTheme = localTheme != null && themes.includes(localTheme) ? localTheme : "dark";
    const [ colorTheme, setColorTheme ] = useState<string>(initialTheme);
    const [ showSaveModal, setShowSaveModal ] = useState(false);
    const [ showLoadModal, setShowLoadModal ] = useState(false);
    const [ savedQueries, setSavedQueries ] = useState(new Map<string, string>());
    const [ showActionButtons, setShowActionButtons ] = useState(false);
    const [ searchParams ] = useSearchParams();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        setShowSaveModal(false);
        setShowLoadModal(false);
        setShowActionButtons(props.showActionButtons && searchParams.size > 0);
    }, [location.pathname]);

    useEffect(() => {
        document.getElementsByTagName("html")[0].setAttribute("data-color-theme", colorTheme);
        localStorage.setItem("theme", colorTheme);
    }, [colorTheme]);

    const handleCopyToClipboard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigator.clipboard.writeText(window.location.href);
        showOnClickTooltip(e.target as HTMLElement);
    };

    const handleSaveLocal = () => {
        setShowSaveModal(true);
    };

    const handleLoadLocal = () => {
        setShowLoadModal(true);
    };

    const showOnClickTooltip = (target: HTMLElement) => {
        const hoverTooltip = target.parentElement?.querySelector(".tooltip-text.hover") as HTMLElement;
        const activeTooltip = target.parentElement?.querySelector(".tooltip-text.active") as HTMLElement;
        hoverTooltip.style.setProperty("visibility", "hidden");
        hoverTooltip.style.setProperty("transition-delay", "0s");
        activeTooltip.style.setProperty("visibility", "visible");
        window.setTimeout(() => {
            hoverTooltip.style.removeProperty("visibility");
            hoverTooltip.style.removeProperty("transition-delay");
            activeTooltip.style.setProperty("visibility", "hidden");
        }, 1000);
    };

    const handleToggleTheme = () => {
        if (colorTheme == "dark") {
            setColorTheme("light");
        } else if (colorTheme == "light") {
            setColorTheme("dark");
        }
    };

    return {
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
    };
};

export default usePageLayout;
