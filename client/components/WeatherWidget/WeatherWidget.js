import React from "react";
import styled from "styled-components";
import { Spring, animated } from "react-spring/renderprops";
import Jumbotron from "./Jumbotron/Jumbotron";
import Forecasts from "./Forecasts/Forecasts";

const Wrapper = styled(animated.div)`
  grid-area: weather;
  min-height: 650px;
  max-width: 70rem;
  width: 95%;
  margin: 20px auto;
  box-shadow: 3px 3px 3px black;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    width: 85%;
    max-height: 650px;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-areas: "jumbotron" "forecasts";
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  border-radius: 5px;
  overflow: hidden;
`;

const WeatherWidget = ({ picture, city, citySuffix, forecasts }) => {
  return (
    <Spring native from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {props => (
        <Wrapper style={props}>
          <Container>
            <Jumbotron
              picture={picture}
              city={city}
              citySuffix={citySuffix}
              lunarCycle={forecasts.daily && forecasts.daily.data[0].moonPhase}
            />
            <Forecasts forecasts={forecasts} />
          </Container>
        </Wrapper>
      )}
    </Spring>
  );
};

export default WeatherWidget;
