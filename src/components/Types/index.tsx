import React from "react";

import { Container } from "./styles";

interface TypeProps {
  typeName: string;
  color: string;
  icon: string;
}

//Componente dos tipos, Recebe o nome, cor é caminho do PNG do icon
const Type: React.FC<TypeProps> = ({ typeName, color, icon }) => (
  <>
    <Container typeColor={color}>
      <img
        src={icon}
        style={{ width: "20px", height: "20px" }}
        alt={typeName}
      />
      <span>{typeName}</span>
    </Container>
  </>
);

export default Type;
