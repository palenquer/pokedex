import React from "react";

interface TypeBoxProps {
  types: [string];
}

export default function TypeBox({ types }: TypeBoxProps) {
  return (
    <div className="flex gap-2">
      {types.map((type) => {
        return (
          <span
            key={type}
            className={`font-bold p-1 px-2 rounded-md text-sm text-background bg-type-${type}`}
          >
            {type.toUpperCase()}
          </span>
        );
      })}
    </div>
  );
}
