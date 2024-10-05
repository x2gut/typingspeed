import React, { Dispatch, SetStateAction, useState } from "react";

interface SearchInputProps {
    className: string;
    setSearchTerm: Dispatch<SetStateAction<string>>
}

const SearchInput: React.FC<SearchInputProps> = ({ className, setSearchTerm }) => {

    const handleSearchInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setSearchTerm(event.target.value);
      };      

    return (
        <input
        type="text"
        placeholder="Search theme"
        className={className}
        onChange={handleSearchInputChange}
      />
    );
}

export default SearchInput;