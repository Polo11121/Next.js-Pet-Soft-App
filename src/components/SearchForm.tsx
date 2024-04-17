"use client";

import { useSearchContext } from "@/contexts";

export const SearchForm = () => {
  const { searchTerm, changeSearchTermHandler } = useSearchContext();

  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        type="search"
        placeholder="Search pets"
        value={searchTerm}
        onChange={changeSearchTermHandler}
      />
    </form>
  );
};
