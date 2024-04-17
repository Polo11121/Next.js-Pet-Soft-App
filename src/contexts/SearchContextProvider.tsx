"use client";

import { ChangeEvent, PropsWithChildren, createContext, useState } from "react";

type SearchContextValue = {
  searchTerm: string;
  changeSearchTermHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchContext = createContext<null | SearchContextValue>(null);

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const changeSearchTermHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event?.target.value);

  const value = {
    searchTerm,
    changeSearchTermHandler,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
