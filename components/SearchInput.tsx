import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {};
  onSubmit: (event: React.FormEvent) => {};
  value: string;
}

export default function SearchInput({
  onChange,
  value,
  onSubmit,
}: SearchInputProps) {
  return (
    <form
      className="relative focus-within:text-darkgray flex gap-4"
      onSubmit={onSubmit}
    >
      <input
        className="border-2 rounded-md border-lightgray py-3 px-4 bg-white placeholder-mediumgray text-darkgray appearance-none w-full focus:outline-none"
        type="text"
        value={value}
        placeholder="Search for a name or id"
        onChange={onChange}
      />

      <button
        className="bg-lightgray w-14 rounded-md flex justify-center items-center hover:brightness-90"
        type="submit"
      >
        <AiOutlineSearch className="text-mediumgray" size={22} />
      </button>
    </form>
  );
}
