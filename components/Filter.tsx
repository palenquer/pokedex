import React from "react";

interface FilterProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  item: string;
}

export default function Filter({ onClick, item }: FilterProps) {
  return (
    <button
      className={`font-bold p-1 px-2 rounded-md text-background bg-type-${item} h-20 hover:brightness-110 hover:transition`}
      onClick={onClick}
    >
      {item.toUpperCase()}
    </button>
  );
}
