import axios from "axios";
import React, { useEffect, useState } from "react";

interface PageProps {
  id: String;
}
interface Pokemon {
  id: String;
  name: String;
  sprite: String;
  types: PokeTypes[];
  stats: PokeStats[];
  weight: Number;
}

interface PokeTypes {
  slot: Number;
  type: {
    name: String;
    url: String;
  };
}

interface PokeStats {
  base_stat: Number;
  effort: Number;
  stat: {
    name: String;
    url: String;
  };
}

interface ParamsProps {
  params: {
    id: String;
  };
}

export default function Pokemon({ id }: PageProps) {
  const [pokemon, setPokemon] = useState<Pokemon>(Object)

  async function getPokemonData() {
    const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((item) => item.data);

    const filterResponse: Pokemon = {
      id: response.id,
      name: response.name,
      weight: response.weight,
      sprite: response.sprites.front_default,
      types: response.types.map((item: PokeTypes) => item.type.name),
      stats: response.stats.map((item: PokeStats) => {
        return {
          name: item.stat.name,
          base: item.base_stat,
        };
      }),
    };

    setPokemon(filterResponse);

    return filterResponse;
  }

  useEffect(() => {
    getPokemonData();
  }, []);

  return (
    <main>
      <h1>You opened a page with id {pokemon.id} and pokemon name {pokemon.name}</h1>
    </main>
  );
}
export const getServerSideProps = async ({ params }: ParamsProps) => {
  const { id } = params;

  return {
    props: { id: id },
  };
};
