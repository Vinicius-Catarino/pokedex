import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import { FaHeart } from "react-icons/fa";

import CardPokemon from "../../components/CardPokemon";

import { Header, Title, Form, Error, ButtonLoadMore } from "./styles";

interface IPokemon {
  name: string;
}

const Home: React.FC = () => {
  const pokemonsPerPage = 9;
  const allPokemonsNumber = 750;

  const [pokemons, setPokemons] = useState<IPokemon[]>(() => {
    const storagePokemons = localStorage.getItem("@Pokedex:pokemons");
    if (storagePokemons) return JSON.parse(storagePokemons);
    else return [];
  });
  const [pokemonToSearch, setpokemonToSearch] = useState("");
  const [inputError, setInputError] = useState("");

  //State utilizado para validar o botão de carregar mais pokémons
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOfsset] = useState(0);

  const loadInitialPokemons = useCallback(async () => {
    //Busca os pokemons iniciais
    const { data: response } = await api.get("/pokemon", {
      params: {
        limit: pokemonsPerPage,
      },
    });

    setIsSearch(false);
    //Seta os pokémons iníciais no localStorage para não realizar está request toda vez que a página for carregada
    localStorage.setItem("@Pokedex:pokemons", JSON.stringify(response.results));
    setPokemons(response.results);
  }, []);

  useEffect(() => {
    // Valida se há pokémons no localStorage se não houver busca a primeira página de pokémons
    const storagePokemons = localStorage.getItem("@Pokedex:pokemons");
    if (!storagePokemons) {
      loadInitialPokemons();
    }
  }, [loadInitialPokemons]);

  const handlePokemonSearch = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      //valida se há o nome do pokemon no input
      if (!pokemonToSearch) {
        //Seta o erro no input
        setInputError("Digite o nome do pokemon.");

        return loadInitialPokemons();
      }

      try {
        setIsSearch(true);

        //busca todos os pokemons da api
        const { data: response } = await api.get(
          `/pokemon?limit=${allPokemonsNumber}`
        );

        // faz um filtro dos pokémons a partir do nome que está digitado no input
        const pokemonsSearch = response.results.filter(({ name }: IPokemon) =>
          name.includes(pokemonToSearch)
        );

        //valida se há pokemons com o nome digitado no input
        if (!pokemonsSearch.length) {
          return setInputError("Não há pokémons com esse nome");
        }

        setPokemons(pokemonsSearch);

        setInputError("");
      } catch (error) {
        console.log(error);
      }
    },
    [pokemonToSearch, loadInitialPokemons]
  );

  const handleLoadMorePokemons = useCallback(async () => {
    try {
      setIsLoading(true);

      //Busca as próximas páginas de pokémons
      const { data: response } = await api.get(`/pokemon`, {
        params: { limit: pokemonsPerPage, offset: offset + pokemonsPerPage },
      });

      const morePokemons = response.results;

      setOfsset(offset + pokemonsPerPage);
      setPokemons((state) => [...state, ...morePokemons]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [offset]);

  return (
    <>
      <Header>
        <Title>Pokédex</Title>
        <Link to="/favorites">
          Favoritos <FaHeart />
        </Link>
      </Header>
      <Form hasError={!!inputError} onSubmit={handlePokemonSearch}>
        <input
          value={pokemonToSearch}
          onChange={(e) => {
            setpokemonToSearch(e.target.value);
          }}
          placeholder="Digite o nome do pokemon"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      {pokemons?.map((pokemon) => (
        <CardPokemon key={pokemon.name} name={pokemon.name} />
      ))}

      {!isSearch && (
        <ButtonLoadMore onClick={() => handleLoadMorePokemons()}>
          {isLoading ? "Carregando" : "Carregar mais pokemons"}
        </ButtonLoadMore>
      )}
    </>
  );
};

export default Home;
