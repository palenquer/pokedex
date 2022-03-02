import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { fetchAllData } from "../utils/functions";
import InfiniteScroll from "react-infinite-scroll-component";
import PokeCard from "../components/PokeCard";
import SearchInput from "../components/SearchInput";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { usePokelist } from "../hooks/pokeList";

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
  const { pokelist, updatePokelist } = usePokelist();
  const [searchPokemon, setSearchPokemon] = useState<Pokelist>({
    id: 0,
    name: "",
    sprite: "",
    types: [""],
  });
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function getData(url: string) {
    setLoading(true);

    const response = await axios
      .get(url)
      .then((response) => {
        setLoading(false);
        return response.data;
      })
      .catch((error) => {
        setLoading(false);
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
    if (pokelist.length == 0) {
      const inicialData = await getData(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
      );

      updatePokelist(inicialData);
    }
  }

  async function fetchNextData() {
    if (pokelist.length >= 800) {
      setHasMore(false);
      return;
    }

    const nextData = await getData(
      `https://pokeapi.co/api/v2/pokemon/?offset=${pokelist.length}&limit=20`
    );

    const concatData = [...pokelist, ...nextData];

    updatePokelist(concatData);

    return nextData;
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

    const handleValue = inputValue.toLowerCase();

    setSearchValue(handleValue);

    if (handleValue != "") {
      setSearchLoading(true);

      const response = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${handleValue}`)
        .then((response) => {
          setSearchLoading(false);
          return response.data;
        })
        .catch((error) => {
          setSearchLoading(false);
          setSearchValue("");
          setInputValue("");
          toast.error("Pokemon not found!", {
            theme: "colored",
          });
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
          onClick={() => {
            setSearchValue("");
            setInputValue("");
          }}
          onSubmit={getSearchPokemon}
          onChange={handleInputValue}
          value={inputValue}
        />

        {searchLoading && <Loading />}

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
            loader={hasMore}
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
