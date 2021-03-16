import IconBug from "./bug.png";
import IconDark from "./dark.png";
import IconDragon from "./dragon.png";
import IconElectric from "./electric.png";
import IconFairy from "./fairy.png";
import IconFighting from "./fighting.png";
import IconFire from "./fire.png";
import IconFlying from "./flying.png";
import IconGhost from "./ghost.png";
import IconGrass from "./grass.png";
import IconGround from "./ground.png";
import IconIce from "./ice.png";
import IconNormal from "./normal.png";
import IconPoison from "./poison.png";
import IconPsychic from "./psychic.png";
import IconRock from "./rock.png";
import IconSteel from "./steel.png";
import IconWater from "./water.png";

interface IIcons {
  [key: string]: string;
}

const Icons: IIcons = {
  bug: IconBug,
  dark: IconDark,
  dragon: IconDragon,
  electric: IconElectric,
  fairy: IconFairy,
  fighting: IconFighting,
  fire: IconFire,
  flying: IconFlying,
  ghost: IconGhost,
  grass: IconGrass,
  ground: IconGround,
  ice: IconIce,
  normal: IconNormal,
  poison: IconPoison,
  psychic: IconPsychic,
  rock: IconRock,
  steel: IconSteel,
  water: IconWater,
};

export default Icons;
