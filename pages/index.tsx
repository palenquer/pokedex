import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { fetchAllData } from "../utils/functions";
import InfiniteScroll from "react-infinite-scroll-component";
import PokeCard from "../components/PokeCard";
import SearchInput from "../components/SearchInput";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

interface DataProps {
  name: string;
  url: string;
}

interface Pokelist {
  id: number;
  name: string;
  sprite: string;
  types: [string];
}
interface PokeTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

const Home = () => {
  const [pokelist, setPokelist] = useState<Pokelist[]>([]);
  const [searchPokemon, setSearchPokemon] = useState<Pokelist>({
    id: 0,
    name: "",
    sprite: "",
    types: [""],
  });
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function getData(url: string) {
    setLoading(true);

    const response = await axios
      .get(url)
      .then((response) => {
        setLoading(false);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    const data = response.results;

    const urls = data.map((item: DataProps) => item.url);

    const pokelistInfo = await fetchAllData(urls).then((response) => {
      return response.map((item) => {
        return {
          id: item.id,
          name: item.name,
          sprite: item.sprites.front_default,
          types: item.types.map((res: PokeTypes) => res.type.name),
        };
      });
    });

    return pokelistInfo;
  }

  async function fetchInicialData() {
    const inicialData = await getData(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
    );

    setPokelist(inicialData);
  }

  async function fetchNextData() {
    const nextData = await getData(
      `https://pokeapi.co/api/v2/pokemon/?offset=${pokelist.length}&limit=20`
    );

    const filterData = nextData.filter((item) => item.id <= 809);

    setPokelist((oldList) => [...oldList, ...filterData]);
  }

  async function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  async function getSearchPokemon(e: React.FormEvent) {
    e.preventDefault();

    setSearchPokemon({
      id: 0,
      name: "",
      sprite: "",
      types: [""],
    });

    const handleValue = inputValue;

    setSearchValue(handleValue);

    if (handleValue != "") {
      setLoading(true);

      const response = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${handleValue}`)
        .then((response) => {
          setLoading(false);
          return response.data;
        })
        .catch((error) => {
          setLoading(false);
          setSearchValue("");
          setInputValue("");
          toast.error("Pokemon not found!");
          return console.error(error);
        });

      if (response) {
        const pokeFilter = {
          id: response.id,
          name: response.name,
          sprite: response.sprites.front_default,
          types: response.types.map((res: PokeTypes) => res.type.name),
        };

        setSearchPokemon(pokeFilter);
      }
    }
  }

  useEffect(() => {
    fetchInicialData();
  }, []);

  return (
    <>
      <Head>
        <title>Pokedéx | Home</title>
      </Head>

      <main className="lg:mx-auto lg:container lg:px-40 md:py-8 p-4 flex flex-col gap-4">
        <SearchInput
          onSubmit={getSearchPokemon}
          onChange={handleInputValue}
          value={inputValue}
        />

        {searchPokemon.name != "" && searchValue != "" ? (
          <PokeCard
            id={searchPokemon.id}
            types={searchPokemon.types}
            name={searchPokemon.name}
            sprite={searchPokemon.sprite}
          />
        ) : (
          <InfiniteScroll
            dataLength={pokelist.length}
            next={fetchNextData}
            className="flex flex-col items-center gap-8 sm:grid grid-cols-2 xl:grid-cols-4 overflow-auto h-96 p-4"
            hasMore={true}
            loader={false}
          >
            {pokelist.map((pokemon) => {
              return (
                <PokeCard
                  key={pokemon.id}
                  id={pokemon.id}
                  types={pokemon.types}
                  name={pokemon.name}
                  sprite={pokemon.sprite}
                />
              );
            })}
          </InfiniteScroll>
        )}

        {loading && <Loading />}
      </main>
    </>
  );
};

export default Home;
