import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getDay } from "../../../utils/timestamp";
import getWeatherIcon from "../../../utils/weatherIcon";
import { Transition, animated } from "react-spring/renderprops";

const Container = styled(animated.div)`
  grid-area: today;
  display: grid;
  grid-template-areas: "temp weather";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 40px;
  color: white;
  margin: auto;
  padding: 20px;
`;

const Temp = styled.div`
  grid-area: temp;
  display: grid;
  grid-template-areas: "current-temp" "day";
  grid-template-rows: 1fr auto;
`;

const Weather = styled.div`
  grid-area: weather;
  display: grid;
  grid-template-areas: "current-weather" "wind";
  grid-template-rows: 1fr auto;
`;

const WeatherIcon = styled.div`
  grid-area: current-weather;
  margin: auto;

  img {
    height: 80px;
    width: auto;

    @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
        mediaQueryMinWidth}) {
      height: 100px;
    }
  }
`;

const CurrentTemp = styled.span`
  grid-area: current-temp;
  margin: auto;
  font-size: 4rem;
  font-weight: bold;

  span {
    position: absolute;
    font-size: 3rem;
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    font-size: 5rem;
  }
`;

const Day = styled.span`
  grid-area: day;
  margin: auto;
  background-color: #a4a4a478;
  padding: 5px 10px;
  border-radius: 50px;
`;

const Wind = styled.span`
  grid-area: wind;
  margin: 0 10px;
  margin: auto;
`;

const Today = ({ isForecastsLoading, data }) => {
  return (
    <Transition
      native
      items={isForecastsLoading}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {loading =>
        !loading &&
        (props => (
          <Container style={props}>
            <Temp>
              <CurrentTemp>
                {data && parseInt(data.temperature)}
                <span>°</span>
              </CurrentTemp>
              <Day>{data && getDay(data.time)}</Day>
            </Temp>

            <Weather>
              <WeatherIcon>
                <img
                  src={data && getWeatherIcon(data.icon)}
                  alt={data && data.icon}
                />
              </WeatherIcon>
              <Wind>{data && data.windSpeed}mph</Wind>
            </Weather>
          </Container>
        ))
      }
    </Transition>
  );
};

const mapStateToProps = state => {
  return {
    isForecastsLoading: state.forecasts.loading
  };
};

export default connect(mapStateToProps)(Today);
