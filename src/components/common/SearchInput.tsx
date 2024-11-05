import React, { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
    className: string;
    placeholder: string;
    setSearchTerm: Dispatch<SetStateAction<string>>
}

const SearchInput: React.FC<SearchInputProps> = ({ className, setSearchTerm, placeholder }) => {

    const handleSearchInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setSearchTerm(event.target.value);
      };      

    return (
        <input
        type="text"
        placeholder={placeholder}
        className={className}
        onChange={handleSearchInputChange}
      />
    );
}

export default SearchInput;