import React from "react";
import { CgPokemon } from "react-icons/cg";

export default function Header() {
  return (
    <header className="lg:mx-auto lg:container lg:px-40 md:py-8 p-4 flex items-center gap-2">
      <CgPokemon size={40} />

      <h1 className="font-black text-4xl">Pokédex</h1>
    </header>
  );
}
