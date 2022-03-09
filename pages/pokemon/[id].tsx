import React from "react";
import Link from "next/link";
import axios from "axios";

import { MdKeyboardBackspace, MdOutlineMonitorWeight } from "react-icons/md";
import { CgRuler } from "react-icons/cg";

import * as Progress from "@radix-ui/react-progress";
import TypeBox from "../../components/TypeBox";
import Head from "next/head";

interface PageProps {
  pokeinfo: Pokemon;
}
interface Pokemon {
  id: String;
  name: String;
  sprite: string;
  types: [string];
  stats: [PokemonStats];
  weight: Number;
  height: Number;
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

interface PokemonStats {
  base: number;
  name: string;
}

interface ParamsProps {
  params: {
    id: String;
  };
}

export default function Pokemon({ pokeinfo }: PageProps) {
  return (
    <>
      <Head>
        <title>
          Pokedéx |{" "}
          {pokeinfo.name.charAt(0).toUpperCase() + pokeinfo.name.slice(1)}
        </title>
      </Head>

      <main className="md:mt-20 p-4 flex justify-center">
        <section
          className={`border-4 border-type-${pokeinfo.types[0]} bg-type-${pokeinfo.types[0]} rounded-md w-full md:w-[600px]`}
        >
          <div className="text-white flex justify-between items-center p-4">
            <Link href="/">
              <a>
                <MdKeyboardBackspace size={40} />
              </a>
            </Link>

            <h1 className="text-2xl font-black">
              {pokeinfo.name.toUpperCase()}
            </h1>

            <span className="font-bold text-xl">#{pokeinfo.id}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center bg-white rounded-md p-8 gap-12 justify-center">
            <div className="flex flex-col items-center gap-8">
              <figure className="flex items-center flex-col gap-2">
                <img
                  className="w-60 h-60"
                  src={pokeinfo.sprite}
                  alt="pokemon sprite"
                />
                <div className="flex gap-2">
                  <TypeBox types={pokeinfo.types} />
                </div>
              </figure>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2 w-32">
                  <div className="flex items-center gap-1 font-bold">
                    <MdOutlineMonitorWeight size={24} />

                    <span>{pokeinfo.weight}</span>
                    <span>kg</span>
                  </div>

                  <span className="text-sm text-mediumgray">Weight</span>
                </div>

                <div className="w-[3px] h-12 bg-lightgray" />

                <div className="flex flex-col items-center gap-2 w-32">
                  <div className="flex items-center gap-1 font-bold">
                    <CgRuler className="rotate-90" size={24} rotate={20} />

                    <span>{pokeinfo.height}</span>
                    <span>m</span>
                  </div>

                  <span className="text-sm text-mediumgray">Height</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {pokeinfo.stats.map((item) => {
                return (
                  <div key={item.name} className="flex flex-col items-center">
                    <span
                      className={`font-bold text-type-${pokeinfo.types[0]}`}
                    >
                      {item.name}
                    </span>
                    <Progress.Root
                      value={item.base}
                      className="w-60 md:w-40 h-2 bg-lightgray rounded-md"
                      max={200}
                    >
                      <Progress.Indicator
                        className={`h-full rounded-md bg-type-${pokeinfo.types[0]}`}
                        style={{ width: `${item.base}%`, maxWidth: "160px" }}
                      />
                    </Progress.Root>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
export const getServerSideProps = async ({ params }: ParamsProps) => {
  const { id } = params;

  const response = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((item) => item.data);

  const filterResponse: Pokemon = {
    id: response.id,
    name: response.name,
    weight: response.weight / 10,
    height: response.height / 10,
    sprite: response.sprites.other["official-artwork"].front_default,
    types: response.types.map((item: PokeTypes) => item.type.name),
    stats: response.stats.map((item: PokeStats) => {
      return {
        name: item.stat.name.toUpperCase(),
        base: item.base_stat,
      };
    }),
  };

  return {
    props: { pokeinfo: filterResponse },
  };
};
