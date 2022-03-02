import { createContext, useContext, useState } from "react";

interface Pokelist {
  id: number;
  name: string;
  sprite: string;
  types: [string];
}

type pokelistContextType = {
  pokelist: Pokelist[];
  updatePokelist: (list: Pokelist[]) => void;
};

type Props = {
  children: React.ReactNode;
};

const PokelistContextDefaultValues: pokelistContextType = {
  pokelist: [],
  updatePokelist: () => {},
};

const PokelistContext = createContext<pokelistContextType>(
  PokelistContextDefaultValues
);

export function usePokelist() {
  return useContext(PokelistContext);
}

export function PokelistProvider({ children }: Props) {
  const [pokelist, setPokelist] = useState<Pokelist[]>([]);

  const updatePokelist = (list: Pokelist[]) => {
    setPokelist(list);
  };

  const value = {
    pokelist,
    updatePokelist,
  };

  return (
    <>
      <PokelistContext.Provider value={value}>
        {children}
      </PokelistContext.Provider>
    </>
  );
}
