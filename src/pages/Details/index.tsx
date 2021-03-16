import React, { useCallback, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import api from "../../services/api";

import { capitalize, split } from "lodash";
import formatTypes from "../../utils/formatTypes";
import getIsFavoritePokemon from "../../utils/getIsFavoritePokemon";

import { FiChevronLeft, FiHeart, FiChevronRight } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Colors from "../../styles/colors";

import Types from "../../components/Types";

import { Header, PokemonInfo, Evolutions } from "./styles";

interface IPokemonParams {
  pokemonId: string;
}

interface ITypes {
  name: string;
  color: string;
  icon: string;
}

interface IPokemon {
  name: string;
  weight: number;
  height: number;
  types: ITypes[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  abilities: [
    {
      ability: {
        name: string;
      };
    }
  ];
}

interface IPokemonSpecies {
  flavor_text_entries: [
    {
      flavor_text: string;
    }
  ];
  genera: [
    {
      genus: string;
      language: {
        name: string;
      };
    }
  ];
}

interface IPokemonEvolves {
  name: string;
}

interface IEvolves {
  species: {
    name: string;
  };
  evolves_to: IEvolves[];
  evolution_details: [{ min_level: number }];
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<IPokemonParams>();

  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [pokemonTypeColor, setPokemontypeColor] = useState("");
  const [pokemonSpecies, setPokemonSpecies] = useState<IPokemonSpecies | null>(
    null
  );
  const [evolveNames, setEvolveNames] = useState<IPokemonEvolves[]>([]);
  const [pokemonEvolutions, setPokemonEvolutions] = useState<IPokemon[]>([]);
  const [isFavotite, setIsFavorite] = useState(false);

  //Função que cria um Array com os nomes de cada evoluão
  const handleEvolutionsNames = useCallback(
    ({ species, evolves_to }: IEvolves) => {
      let names: IPokemonEvolves[] = evolveNames;
      names.push({ name: species.name });
      setEvolveNames(names);
      if (evolves_to.length) handleEvolutionsNames(evolves_to[0]);
      return evolveNames;
    },
    [evolveNames]
  );

  const loadPokemon = useCallback(async () => {
    const { data: response } = await api.get(`pokemon/${params.pokemonId}`);
    const { abilities, name, weight, height, types, sprites } = response;

    //Seta um state utilizado para passar como props nas evoluções
    setPokemontypeColor(Colors.types[types[0].type.name]);

    setPokemon({
      abilities,
      name,
      weight,
      height,
      sprites,
      //monta um objeto dentro de pokemon.types com name, color e icon
      types: formatTypes(types),
    });
  }, [params.pokemonId]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  const loadPokemonSpecies = useCallback(() => {
    try {
      //Busca as informações da especie do pokemon
      api.get(`pokemon-species/${params.pokemonId}`).then((response) => {
        //Faz um split dentro em evolution_chain_url para pegar o id e a rota para buscar as evoluções do pokémon
        const urlEvolutions = response.data.evolution_chain.url.split("v2")[1];

        api.get(urlEvolutions).then((response) => {
          //Chamo a função que me retorna os nomes das evoluções dos pokémons
          const evolutions = handleEvolutionsNames(response.data.chain);

          //Criando um Array contendo as requests das evoluções para passar como parâmetro para o Promise.all
          const requests = evolutions.map(
            (evolve, index) =>
              new Promise<IPokemon>((resolve, reject) => {
                api
                  .get<IPokemon>(`/pokemon/${evolve.name}`)
                  .then((response) => resolve(response.data));
              })
          );

          //Faz a busca das evoluções e seta no state pokemonEvolutions
          Promise.all(requests).then((pokemonDetails) => {
            setPokemonEvolutions(pokemonDetails);
          });
        });
        setPokemonSpecies(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [handleEvolutionsNames, params.pokemonId]);

  useEffect(() => {
    loadPokemonSpecies();
  }, [loadPokemonSpecies]);

  const handleFavoritePokemon = useCallback((name: any) => {
    const hasInStorage = getIsFavoritePokemon(name);

    let favoritesStorage = JSON.parse(
      localStorage.getItem("@Pokedex:favorites")!
    );

    //Valida se o Array do storage não está como null
    //Se estiver seta favoritesStorage com um Array vazio
    if (!hasInStorage && !favoritesStorage) {
      favoritesStorage = [];
    }

    //Se este pokemon já estiver no storage é feito um filter no array pára remover o pokemon de dentro dos favoritos
    //e Seta o state de isFavorite como falso para alterar a visualização
    if (hasInStorage) {
      favoritesStorage = favoritesStorage.filter(
        (favorite: any) => favorite.name !== name
      );
      setIsFavorite(false);
    } else {
      //Se não estiver incrementa o pokémon no Array
      favoritesStorage.push({ name });
      setIsFavorite(true);
    }

    //Seta o array no storage com os dados atualizados
    localStorage.setItem(
      "@Pokedex:favorites",
      JSON.stringify(favoritesStorage)
    );
  }, []);

  useEffect(() => {
    const hasInStorage = getIsFavoritePokemon(pokemon?.name);

    if (hasInStorage) setIsFavorite(true);
    else setIsFavorite(false);
  }, [pokemon]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={28} />
          Voltar
        </Link>
      </Header>
      <PokemonInfo>
        <header>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt="pokemon"
          />
          <div>
            <div>
              <strong>{capitalize(pokemon?.name)}</strong>
              <button
                type="button"
                onClick={() => handleFavoritePokemon(pokemon?.name)}
              >
                {isFavotite ? (
                  <>
                    <FaHeart />
                    Favorito
                  </>
                ) : (
                  <>
                    <FiHeart />
                    Favoritar
                  </>
                )}
              </button>
            </div>

            {pokemonSpecies?.flavor_text_entries.map((text, index) => {
              if (index === 1)
                return <p key={index}>{capitalize(text.flavor_text)}</p>;
            })}

            <p>Type</p>
            <div>
              {pokemon?.types.map((type, index) => (
                <Types
                  key={index}
                  typeName={type.name}
                  color={type.color}
                  icon={type.icon}
                />
              ))}
            </div>
          </div>
        </header>
        <ul>
          <li>
            <span>Height</span>
            <strong>{Number(pokemon?.height) / 10}m</strong>
          </li>
          <li>
            <span>Weight</span>
            <strong>{Number(pokemon?.weight) / 10}kg</strong>
          </li>
          <li>
            <span>Genre</span>
            {pokemonSpecies?.genera.map((genres) => {
              if (genres?.language?.name === "en") {
                const genre = split(genres.genus, " ");
                return <strong key={genre[0]}>{genre[0]}</strong>;
              }
            })}
          </li>
          <li>
            <span>Abilities</span>
            <strong>{pokemon?.abilities[0].ability.name}</strong>
          </li>
        </ul>
      </PokemonInfo>

      <Evolutions evolveTypeColor={pokemonTypeColor}>
        <h1>Evoluções</h1>
        <div>
          {pokemonEvolutions.map((evolve, index) => {
            return (
              <>
                <div key={index}>
                  <div>
                    <img
                      src={
                        evolve.sprites.other["official-artwork"].front_default
                      }
                      alt={evolve.name}
                    />
                  </div>
                  <strong>{capitalize(evolve.name)}</strong>
                </div>
                {index + 1 < pokemonEvolutions.length && <FiChevronRight />}
              </>
            );
          })}
        </div>
      </Evolutions>
    </>
  );
};

export default Details;
