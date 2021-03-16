import styled from "styled-components";

interface ContainerProps {
  typeColor?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  margin-left: 0;

  text-align: center;
  border-radius: 5px;
  padding: 5px 8px 5px 8px;

  background: ${(props) => props.typeColor};

  span {
    & + span {
      margin-left: 5px;
    }
    font-size: 18px;
    color: #fff;
    margin-left: 4px;
  }
`;
