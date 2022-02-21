import React from "react";
import { motion } from "framer-motion";

interface PokeCardProps {
  id: number;
  name: string;
  sprite: string;
  types: [string];
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PokeCard({
  id,
  types,
  name,
  sprite,
  onClick,
}: PokeCardProps) {
  return (
    <motion.button
      className={`bg-background flex flex-col justify-center items-center relative pb-4 rounded-md w-full border-4 border-type-${types[0]} transition hover:scale-105`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      onClick={onClick}
    >
      <div
        className={`bg-type-${types[0]} w-full flex items-center text-background p-2 relative`}
      >
        <h1 className="w-full text-center font-bold">{name.toUpperCase()}</h1>

        <span className=" absolute top-2 right-2 ml-auto font-bold">#{id}</span>
      </div>

      <div className="flex flex-col items-center">
        <img src={sprite} alt="sprite"/>
      </div>

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
    </motion.button>
  );
}
