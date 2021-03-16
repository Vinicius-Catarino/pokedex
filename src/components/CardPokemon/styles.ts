import styled from "styled-components";

interface ContainerProps {
  background?: string;
}

export const Container = styled.div<ContainerProps>`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: ${(props) => props.background};
    border-radius: 5px;
    width: 100% auto;
    padding: 24px;
    display: flex;
    text-decoration: none;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      display: flex;
      flex-direction: column;

      > div {
        align-items: center;

        strong {
          font-size: 30px;
          color: #fff;
        }
        > svg {
          margin-left: 15px;
          font-size: 24px;
          color: #c53030;
        }
      }

      div {
        display: flex;
        flex-direction: row;
        margin-left: 0;
        p {
          & + p {
            margin-left: 5px;
          }
          font-size: 18px;
          color: #fff;
          text-align: center;
          border-radius: 5px;
          padding: 5px 8px 5px 8px;
        }
      }
    }
  }
  svg {
    margin-left: auto;
    color: #fff;
  }
`;
