import { createContext, useState } from "react";

interface searchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const searchContext = createContext<searchContextType>({
    searchQuery: "",
    setSearchQuery: () => {},
});
export default searchContext;
