import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { fetchAllData } from "../utils/functions";

import { AiOutlineClose } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import PokeCard from "../components/PokeCard";
import SearchInput from "../components/SearchInput";
import Loading from "../components/Loading";
import Filter from "../components/Filter";
import { toast } from "react-toastify";

import { usePokelist } from "../hooks/pokeList";
import { types } from "../utils/types";

interface DataProps {
  name: string;
  url: string;
}

interface PokeFilter {
  pokemon: DataProps;
  slot: number;
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
  const [pokefilter, setPokeFilter] = useState<Pokelist[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterComponent, setFilterComponent] = useState(false);
  const [filterTypes, setFilterTypes] = useState<string>("");

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

  async function addType(item: string) {
    setHasMore(false);
    setSearchLoading(true);
    setFilterTypes(item);

    const results = await axios
      .get(`https://pokeapi.co/api/v2/type/${item}`)
      .then((response) => {
        setSearchLoading(false);
        return response.data.pokemon;
      })
      .catch((error) => {
        setSearchLoading(false);
        console.error(error);
      });

    const data = results.map((item: PokeFilter) => item.pokemon);
    const urls = data.map((item: DataProps) => item.url);

    const dataFilter = await fetchAllData(urls).then((response) => {
      return response
        .map((item) => {
          return {
            id: item.id,
            name: item.name,
            sprite: item.sprites.front_default,
            types: item.types.map((res: PokeTypes) => res.type.name),
          };
        })
        .filter((item) => item.id < 800);
    });

    setPokeFilter(dataFilter);

    return dataFilter;
  }

  function handleFilterComponent() {
    setFilterComponent(!filterComponent);
  }

  function handleClearFilter() {
    setHasMore(true);
    setFilterTypes("");
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
            setSearchPokemon({
              id: 0,
              name: "",
              sprite: "",
              types: [""],
            });
          }}
          onSubmit={getSearchPokemon}
          onChange={handleInputValue}
          onClickFilter={handleFilterComponent}
          value={inputValue}
          filterIsOn={filterComponent}
          searchPokemon={searchPokemon}
        />

        {filterComponent && searchValue === "" &&(
          <div className="grid grid-cols-2 sm:grid-cols-6 2xl:grid-cols-9 gap-2">
            {types.map((item) => {
              return (
                <Filter key={item} item={item} onClick={() => addType(item)} />
              );
            })}
          </div>
        )}

        {filterTypes && searchValue === "" && (
          <div className="flex items-center sm:justify-center relative">
            <span
              className={`flex items-center justify-center text-center w-32 h-10 text-background bg-type-${filterTypes} rounded-full font-bold`}
            >
              {filterTypes.toUpperCase()}
            </span>

            <button
              className="absolute right-0 flex items-center text-type-fighting border-2 rounded-md p-2"
              onClick={handleClearFilter}
            >
              <AiOutlineClose />
              <span>Clear filter</span>
            </button>
          </div>
        )}

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
            className="flex flex-col items-center gap-8 sm:grid grid-cols-2 xl:grid-cols-4 overflow-y-scroll h-96 p-4"
            hasMore={hasMore}
            loader={hasMore}
          >
            {filterTypes != ""
              ? pokefilter.map((pokemon) => {
                  return (
                    <PokeCard
                      key={pokemon.id}
                      id={pokemon.id}
                      types={pokemon.types}
                      name={pokemon.name}
                      sprite={pokemon.sprite}
                    />
                  );
                })
              : pokelist.map((pokemon) => {
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
