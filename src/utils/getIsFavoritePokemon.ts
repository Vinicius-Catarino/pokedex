export default function getIsFavoritePokemon(name: any) {
  let favoritesStorage = JSON.parse(
    localStorage.getItem("@Pokedex:favorites")!
  );
  //Valida se há este item @pokedex:favorites no storage
  if (!favoritesStorage || !favoritesStorage.length) return false;

  //Se houver o item "@pokedex:favorites" no storage faz uma busca se do pokemon atual
  const hasInStorage = favoritesStorage.filter(
    (favorite: any) => favorite.name === name
  );

  if (hasInStorage.length) return true;
  else return false;
}
