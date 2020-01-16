import React from "react";
import styled from "styled-components";
import Today from "./Today";
import WeekdayContainer from "./WeekdayContainer";
import Weekday from "./Weekday";

const Container = styled.div`
  grid-area: forecasts;
  display: grid;
  grid-template-areas: "today" "weekday";
  grid-template-columns: auto;
  background-color: #8787875c;
  text-shadow: 3px 3px 3px black;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    grid-template-areas: "today weekday";
    grid-template-columns: auto auto;
  }
`;

const Forecasts = ({ forecasts }) => {
  return (
    <Container>
      <Today data={forecasts.currently} />
      <WeekdayContainer>
        <Weekday
          id="weekday0"
          gridArea="weekday0"
          data={forecasts.daily ? forecasts.daily.data[1] : null}
        />
        <Weekday
          id="weekday1"
          gridArea="weekday1"
          data={forecasts.daily ? forecasts.daily.data[2] : null}
        />
        <Weekday
          id="weekday2"
          gridArea="weekday2"
          data={forecasts.daily ? forecasts.daily.data[3] : null}
        />
        <Weekday
          id="weekday3"
          gridArea="weekday3"
          data={forecasts.daily ? forecasts.daily.data[4] : null}
        />
        <Weekday
          id="weekday4"
          gridArea="weekday4"
          data={forecasts.daily ? forecasts.daily.data[5] : null}
        />
        <Weekday
          id="weekday5"
          gridArea="weekday5"
          data={forecasts.daily ? forecasts.daily.data[6] : null}
        />
      </WeekdayContainer>
    </Container>
  );
};

export default Forecasts;
