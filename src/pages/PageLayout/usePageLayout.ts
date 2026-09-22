import * as React from "react";
import { useEffect, useState } from "react";

const themes = [ "dark", "light" ];

const usePageLayout = () => {
    const localTheme = localStorage.getItem("theme");
    const initialTheme = localTheme != null && themes.includes(localTheme) ? localTheme : "dark";
    const [ colorTheme, setColorTheme ] = useState<string>(initialTheme);

    useEffect(() => {
        document.getElementsByTagName("html")[0].setAttribute("data-color-theme", colorTheme);
        localStorage.setItem("theme", colorTheme);
    }, [colorTheme]);

    const handleCopyToClipboard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigator.clipboard.writeText(window.location.href);
        showOnClickTooltip(e.target as HTMLElement);
    };

    const handleSaveLocal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        localStorage.setItem("url", window.location.href);
        showOnClickTooltip(e.target as HTMLElement);
    };

    const showOnClickTooltip = (target: HTMLElement) => {
        const hoverTooltip = target.parentElement?.querySelector(".tooltip-text.hover") as HTMLElement;
        const activeTooltip = target.parentElement?.querySelector(".tooltip-text.active") as HTMLElement;
        hoverTooltip.style.setProperty("visibility", "hidden");
        activeTooltip.style.setProperty("visibility", "visible");
        window.setTimeout(() => {
            hoverTooltip.style.removeProperty("visibility");
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
        handleCopyToClipboard,
        handleSaveLocal,
        handleToggleTheme,
    };
};

export default usePageLayout;
