import React from "react";
import styled from "styled-components";
import { getDay } from "../../../utils/timestamp";
import getWeatherIcon from "../../../utils/weatherIcon";

const Container = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  display: grid;
  grid-template-areas: "day" "weather-icon" "temp";
  grid-template-rows: auto 1fr auto;
  grid-column-gap: 20px;
  padding: 20px;
  min-height: 170px;
  border-left: 1px solid #05050559;
  color: white;
`;

const Day = styled.div`
  grid-area: day;
  margin: auto;
  background-color: #a4a4a478;
  padding: 5px 10px;
  border-radius: 50px;
`;

const WeatherIcon = styled.div`
  grid-area: weather-icon;
  margin: auto;

  img {
    max-width: 40px;
    height: auto;
  }
`;

const Temp = styled.div`
  grid-area: temp;
  margin: auto;
  font-weight: bold;
`;

const Weekday = ({ id, gridArea, data }) => {
  return (
    <Container id={id} gridArea={gridArea}>
      <Day>{data && getDay(data.time, true).toUpperCase()}</Day>
      <WeatherIcon>
        <img src={data && getWeatherIcon(data.icon)} alt={data && data.icon} />
      </WeatherIcon>
      <Temp>
        {data && parseInt((data.temperatureMin + data.temperatureMax) / 2)}°
      </Temp>
    </Container>
  );
};

export default Weekday;
