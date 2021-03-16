import Colors from "../styles/colors";
import IconTypes from "../assets/types";

interface ITypes {
  name: string;
  color: string;
  icon: string;
}

export default function formatTypes(types: any) {
  let formatedTypes: ITypes[] = [];
  types.forEach((pokemonType: any) => {
    // Reconhece a variável como uma chave de array
    const pokemonTypeName = pokemonType.type.name as keyof typeof IconTypes;

    //Seta os tipos dentro do array formatedTypes
    formatedTypes.push({
      name: pokemonType.type.name,
      color: Colors.types[pokemonType.type.name],
      icon: IconTypes[pokemonTypeName],
    });
  });
  return formatedTypes;
}
