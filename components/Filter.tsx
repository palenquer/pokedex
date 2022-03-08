import React from "react";
import { types } from "../utils/types";

interface FilterProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Filter({ onClick }: FilterProps) {
  return (
    <div className="border-lightgray border-2 p-4 rounded-md grid grid-cols-3 sm:grid-cols-6 2xl:grid-cols-10 gap-2 text-center">
      {types.map((item) => {
        return (
          <button
            className={`font-bold p-1 px-2 rounded-md text-sm text-background h-20 bg-type-${item} brightness-90 hover:brightness-110`}
            onClick={onClick}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
