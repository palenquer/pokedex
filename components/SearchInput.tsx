import React from "react";

export default function SearchInput() {
  return (
    <input
      className="w-full h-12 p-2 rounded-md placeholder:italic text-gray-800 border-2 border-lightgray"
      type="text"
      placeholder="Search"
    />
  );
}
