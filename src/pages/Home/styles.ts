import styled, { css } from "styled-components";
import { shade } from "polished";

interface FormProps {
  hasError: Boolean;
}

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;

  a {
    margin-left: 30px;
    padding: 10px;
    border: none;
    background: #6b88b0;
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;

    > svg {
      margin-left: 5px;
      color: #c53030;
      font-size: 20px;
    }
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #f3f3f3;
    border-right: 0;

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #6b88b0;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, "#9eb9de")};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const ButtonLoadMore = styled.button`
  max-width: 700px;
  width: 100%;
  margin: 30px 0;

  background: #6b88b0;
  padding: 10px;
  border: none;
  border-radius: 10px;

  font-size: 20px;
  color: #fff;
`;
