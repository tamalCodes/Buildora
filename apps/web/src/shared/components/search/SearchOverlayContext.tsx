import React, { createContext, useContext, useMemo, useState } from "react";

type SearchOverlayContextValue = {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const SearchOverlayContext = createContext<SearchOverlayContextValue | null>(
  null
);

export const SearchOverlayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openSearch: () => setIsOpen(true),
      closeSearch: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <SearchOverlayContext.Provider value={value}>
      {children}
    </SearchOverlayContext.Provider>
  );
};

export const useSearchOverlay = () => {
  const context = useContext(SearchOverlayContext);
  if (!context) {
    throw new Error("useSearchOverlay must be used within SearchOverlayProvider");
  }
  return context;
};
