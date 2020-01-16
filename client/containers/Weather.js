import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  setCurrentLocation,
  getCurrentLocation
} from "../store/actions/currentLocation";
import { getForecasts } from "../store/actions/forecasts";
import { getPicture } from "../store/actions/picture";
import Background from "../components/Background/Background";
import SearchBar from "../components/SearchBar/SearchBar";
import WeatherWidget from "../components/WeatherWidget/WeatherWidget";

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-areas: "searchbar" "weather";
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
`;

const Weather = ({
  getCurrentLocation,
  currentLocation,
  setCurrentLocation,
  picture,
  getPicture,
  forecasts,
  getForecasts
}) => {
  const getInitialData = async () => {
    const latitude = localStorage.latitude || 37.7291734;
    const longitude = localStorage.longitude || -123.0466412;

    await getForecasts(latitude, longitude);
    await getCurrentLocation(latitude, longitude);
    await getPicture(latitude, longitude);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          localStorage.setItem("latitude", position.coords.latitude);
          localStorage.setItem("longitude", position.coords.longitude);
          getInitialData();
        },
        () => getInitialData()
      );
    }
  }, []);

  const setLocation = async (latitude, longitude, name, suffix) => {
    await getForecasts(latitude, longitude);
    setCurrentLocation(name, suffix);
    await getPicture(latitude, longitude);
  };

  return (
    <Container>
      <Background picture={picture.path} />
      <SearchBar setLocation={setLocation} />
      <WeatherWidget
        picture={picture.path}
        city={currentLocation.name}
        citySuffix={currentLocation.suffix}
        forecasts={forecasts.data}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    currentLocation: state.currentLocation,
    forecasts: state.forecasts,
    picture: state.picture
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentLocation: (latitude, longitude) =>
      dispatch(getCurrentLocation(latitude, longitude)),
    setCurrentLocation: (name, suffix) =>
      dispatch(setCurrentLocation(name, suffix)),
    getForecasts: (latitude, longitude) =>
      dispatch(getForecasts(latitude, longitude)),
    getPicture: (latitude, longitude) =>
      dispatch(getPicture(latitude, longitude))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);
