import React from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
}

export default function SearchInput({
  onChange,
  value,
  onSubmit,
  onClick,
}: SearchInputProps) {
  return (
    <form
      className="relative focus-within:text-darkgray flex gap-4"
      onSubmit={onSubmit}
    >
      <label className="w-full relative">
        <input
          className="border-2 rounded-md border-lightgray py-3 px-4 bg-white placeholder-mediumgray text-darkgray appearance-none w-full focus:outline-none"
          type="text"
          value={value}
          placeholder="Search for a name or id"
          onChange={onChange}
        />
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-0 h-full w-12 flex items-center justify-center"
          type="button"
          onClick={onClick}
        >
          <AiOutlineClose className="text-mediumgray" size={20} />
        </button>
      </label>

      <button
        className="bg-lightgray w-14 rounded-md flex justify-center items-center hover:brightness-90"
        type="submit"
      >
        <AiOutlineSearch className="text-mediumgray" size={22} />
      </button>
    </form>
  );
}
