import styled from "styled-components";
import * as React from "react";
import { H1, H2 } from "@redocly/theme";

const Header1 = styled(H1)`
  color: white !important;
  font-weight: 700 !important;
  font-size: 42px !important;
  margin: 2em 0px 0.4em !important;

  @media (max-width: 550px) {
    margin-top: 100px !important;
    font-size: 30px !important;
    line-height: 30px !important;
    max-width: 272px;
    
  }
`;

const Header2 = styled(H2)`
  color: white !important;
  font-weight: 400 !important;
  font-size: 22px !important;
  margin: 0 0 2em !important;

  @media (max-width: 550px) {
    font-size: 18px !important;
    line-height: 18px !important;
    max-width: 272px;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 24px;
`;

function LandingContainer({ children }) {
  return <Container>{children}</Container>;
}

const LandingLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Jumbotron = styled.div<{ bgImage; }>`
  width: 100%;
  padding: 0px 1rem 8.5em;
  background: #003d99 url(${props => props.bgImage }) center center / cover no-repeat;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export { Header1, Header2, LandingContainer, LandingLayout, Jumbotron };
