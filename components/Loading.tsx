import React from "react";
import { CgPokemon } from "react-icons/cg";

export default function Loading() {
  return (
    <div className="w-full flex justify-center">
      <CgPokemon className="animate-spin" size={30} />
    </div>
  );
}
