import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FiChevronLeft } from "react-icons/fi";

import CardPokemon from "../../components/CardPokemon";
import { Header, Title, Message } from "./styles";

interface IPokemon {
  name: string;
}

const Favorites: React.FC = () => {
  const [favoritesPokemons, setFavoritesPokemons] = useState<IPokemon[]>();

  useEffect(() => {
    const favoritesPokemons = JSON.parse(
      localStorage.getItem("@Pokedex:favorites")!
    );

    if (!favoritesPokemons) console.log("Voce não tem pokemons como favoritos");

    setFavoritesPokemons(favoritesPokemons);
  }, []);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={28} />
          Voltar
        </Link>
      </Header>
      <Title>Favoritos</Title>

      {favoritesPokemons?.map((favorite) => (
        <CardPokemon key={favorite.name} name={favorite.name} />
      ))}

      {!favoritesPokemons?.length && (
        <Message>Voce não tem pokémons favoritos...</Message>
      )}
    </>
  );
};

export default Favorites;
