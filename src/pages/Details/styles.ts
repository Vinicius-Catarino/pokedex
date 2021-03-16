import styled from "styled-components";

interface IEvolutionProps {
  evolveTypeColor?: string;
}

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: 0.2s;

    &:hover {
      color: #666;
    }
  }

  svg {
    margin-right: 4px;
  }
`;

export const PokemonInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;
    img {
      width: 300px;
      height: 300px;
    }
    div {
      margin-left: 24px;
      font-size: 36px;
      color: #3d3d4d;

      > div {
        strong {
        }

        button {
          display: flex;
          border: 1px solid #efecec;
          margin-left: 20px;
          align-items: center;
          padding: 0 10px;

          > svg {
            margin-right: 5px;
            color: #c53030;
            font-size: 24px;
          }
        }
      }

      p {
        & + p {
          margin-top: 30px;
        }
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }

      div {
        display: flex;
        flex-direction: row;
        margin-top: 4px;
        margin-left: 0;
        & + div {
          margin-left: 4px;
        }
      }
    }
  }
  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;
    li {
      & + li {
        margin-left: 80px;
      }
      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }
    }
  }
`;

export const Evolutions = styled.section<IEvolutionProps>`
  h1 {
    text-align: center;
  }
  margin-top: 80px;
  div {
    display: flex;
    background: #f3f3f3;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    /* border-radius: 5px; */

    div {
      flex-direction: column;

      > div {
        border-radius: 50%;
        border: 5px solid
          ${(props) => props.evolveTypeColor && props.evolveTypeColor};
        img {
          width: 160px;
          height: 160px;
          padding: 20px;
        }
      }

      strong {
        font-size: 20px;
        margin-top: 5px;
        color: #7a7a82;
      }

      div {
        display: flex;
        flex-direction: row;
        margin-left: 0;

        span {
          & + span {
            margin-left: 5px;
          }
          background: #6c6c80;
          font-size: 14px;
          color: #fff;
          border-radius: 5px;
          padding: 5px;
        }
      }
    }
  }
  svg {
    font-size: 50px;
    color: ${(props) => props.evolveTypeColor && props.evolveTypeColor};
  }
`;
