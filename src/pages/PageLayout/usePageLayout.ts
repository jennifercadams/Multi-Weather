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

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const handleSaveLocal = () => {
        localStorage.setItem("url", window.location.href);
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
