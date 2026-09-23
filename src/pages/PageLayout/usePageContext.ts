import { useOutletContext } from "react-router";

export type PageContextType = { pageContext: PageContext | null };

export type PageContext = {
    colorTheme: string;
    handleLoadLocal: () => void;
};

const usePageContext = () => {
    return useOutletContext<PageContextType>();
};

export default usePageContext;
