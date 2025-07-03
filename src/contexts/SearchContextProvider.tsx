import { useState } from "react";
import type { ReactNode } from "react";
import searchContext from "./SearchContext";

const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <searchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </searchContext.Provider>
    );
};

export default SearchProvider;
