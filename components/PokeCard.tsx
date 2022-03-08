import React from "react";
import { motion } from "framer-motion";
import TypeBox from "./TypeBox";
import Link from "next/link";

interface PokeCardProps {
  id: number;
  name: string;
  sprite: string;
  types: [string];
}

export default function PokeCard({ id, types, name, sprite }: PokeCardProps) {
  return (
    <motion.div
      className={`flex flex-col justify-center items-center relative transition hover:scale-105 w-full sm:max-w-[272px] justify-self-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      <Link href={`/pokemon/${id}`}>
        <a
          className={`bg-type-${types[0]} rounded-md border-4 border-type-${types[0]} w-full`}
        >
          <div
            className={`w-full flex items-center text-background p-2 relative`}
          >
            <h1 className="w-full text-center text-lg font-bold">
              {name.toUpperCase()}
            </h1>

            <span className=" absolute top-2 right-2 ml-auto font-bold">
              #{id}
            </span>
          </div>

          <div className="flex flex-col items-center w-full bg-white rounded-md p-4">
            <img src={sprite} alt="sprite" />
            <div className="flex gap-2">
              <TypeBox types={types} />
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}
