import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { fetchAllData } from "../utils/functions";
import InfiniteScroll from "react-infinite-scroll-component";
import PokeCard from "../components/PokeCard";
import SearchInput from "../components/SearchInput";
import Loading from "../components/Loading";
import Link from "next/link";

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
  const [loading, setLoading] = useState(false);

  async function getData(url: string) {
    const response = await axios
      .get(url)
      .then((response) => response.data)
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
    setLoading(true);

    const timer = setTimeout(async () => {
      const inicialData = await getData(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
      );

      setPokelist(inicialData);

      return () => clearTimeout(timer);
    }, 2000);
  }

  async function fetchNextData() {
    setLoading(true);

    const timer = setTimeout(async () => {
      const nextData = await getData(
        `https://pokeapi.co/api/v2/pokemon/?offset=${pokelist.length}&limit=20`
      );

      const filterData = nextData.filter((item) => item.id <= 809);

      setPokelist((oldList) => [...oldList, ...filterData]);

      return () => clearTimeout(timer);
    }, 2000);
  }

  useEffect(() => {
    fetchInicialData();
  }, []);

  return (
    <>
      <Head>
        <title>Pokedéx | Home</title>
      </Head>

      <main className="lg:mx-auto lg:container lg:px-40 md:py-8 p-4 flex flex-col">
        <SearchInput />

        <InfiniteScroll
          dataLength={pokelist.length}
          next={fetchNextData}
          className="flex flex-col items-center gap-8 sm:grid grid-cols-2 xl:grid-cols-4 h-96 overflow-auto p-4"
          hasMore={true}
          loader={false}
        >
          {pokelist.map((pokemon) => {
            return (
              <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                <a className="w-full">
                <PokeCard
                  id={pokemon.id}
                  types={pokemon.types}
                  name={pokemon.name}
                  sprite={pokemon.sprite}
                />
                </a>
              </Link>
            );
          })}
        </InfiniteScroll>

        {loading && <Loading />}
      </main>
    </>
  );
};

export default Home;
