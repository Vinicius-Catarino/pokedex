import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import { lowerCase, capitalize } from "lodash";

import { FaHeart } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Colors from "../../styles/colors";

import getIsFavoritePokemon from "../../utils/getIsFavoritePokemon";
import formatTypes from "../../utils/formatTypes";

import Types from "../Types";
import { Container } from "./styles";

interface ITypes {
  name: string;
  color: string;
  icon: string;
}

export interface IPokemon {
  id: string;
  image: string;
  types: ITypes[];
  backgroundColor: string;
}

const CardPokemon: React.FC<{ name: string }> = ({ name }) => {
  const [pokemon, setPokemon] = useState({} as IPokemon);

  useEffect(() => {
    try {
      // Faz uma busca das informações de cada pokemon com base no name passado ao Card
      api.get(`/pokemon/${name}`).then((response) => {
        const { id, types, sprites } = response.data;

        let type = lowerCase(types[0].type.name);

        //Valida o type predominante nos pokémons que tem mais de um tipo.
        if (type === "normal" && types.length > 1) type = types[1].type.name;

        setPokemon({
          id,
          backgroundColor: Colors.backgroundTypes[type],
          image: sprites.other["official-artwork"].front_default,
          // Chama uma função que monta um objeto dentro de pokemon.types com name, color e icon
          types: formatTypes(types),
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [name]);

  return (
    <>
      <Container background={pokemon.backgroundColor}>
        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
          <img src={pokemon.image} alt={name} />
          <div>
            <div>
              <strong>{capitalize(name)}</strong>
              {getIsFavoritePokemon(name) && (
                <>
                  <FaHeart />
                </>
              )}
            </div>
            <div>
              {pokemon?.types?.map((type: any) => (
                <Types
                  key={type.name}
                  typeName={type.name}
                  color={type.color}
                  icon={type.icon}
                />
              ))}
            </div>
          </div>
          <FiChevronRight />
        </Link>
      </Container>
    </>
  );
};

export default CardPokemon;
