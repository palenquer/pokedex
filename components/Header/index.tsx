import React from "react";
import { MdOutlineCatchingPokemon } from "react-icons/md";

export default function Header() {
  return (
    <header className="lg:mx-auto lg:container lg:px-40 md:py-8 p-4 flex items-center gap-4">
      <MdOutlineCatchingPokemon size={40} />

      <h1 className="font-black text-4xl">Pokédex</h1>
    </header>
  );
}
