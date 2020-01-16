import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Transition, animated } from "react-spring/renderprops";
import moonPhase from "../../../utils/moonPhase";
import Spinner from "../../Spinner/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const Container = styled.div`
  position: relative;
  grid-area: jumbotron;
  display: grid;
  grid-template-areas: "city city-suffix" "sun moon";
  grid-row-gap: 10px;
  padding: 20px;
  min-height: 20rem;
  color: white;
  font-size: 1.5rem;
  text-shadow: 3px 3px 3px black;

  transition: background-image 0.3s;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    min-height: 30rem;
  }
`;

const Picture = styled(animated.div)`
  position: absolute;
  background-color: #8787875c;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  span {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`;

const City = styled(animated.div)`
  grid-area: city;
  font-size: 2rem;
  font-weight: bold;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    font-size: 3rem;
  }
`;

const CitySuffix = styled(animated.div)`
  grid-area: city-suffix;
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  flex-flow: column;

  i {
    font-size: 2.5rem;
  }

  span {
    font-size: 1.2rem;
    margin: 5px 0;
    text-align: right;
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    align-items: center;
  }
`;

const Sun = styled(animated.div)`
  grid-area: sun;
  margin-top: auto;

  span {
    font-size: 1.2rem;
  }
`;

const Moon = styled(animated.div)`
  grid-area: moon;
  margin-top: auto;
  margin-left: auto;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  text-align: right;

  img {
    width: 30px;
    height: auto;

    @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
        mediaQueryMinWidth}) {
      width: 50px;
    }
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    align-items: center;
  }
`;

const Jumbotron = ({
  isForecastsLoading,
  isCurrentLocationLoading,
  isPictureLoading,
  picture,
  city,
  citySuffix,
  sunrise,
  sunset,
  lunarCycle
}) => {
  return (
    <Container>
      {isPictureLoading ? <Spinner /> : null}
      <Transition
        native
        items={picture}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {picture =>
          picture &&
          (props => (
            <Picture style={props} picture={picture}>
              <LazyLoadImage effect="opacity" src={picture} />
            </Picture>
          ))
        }
      </Transition>
      <Transition
        native
        items={isForecastsLoading || isCurrentLocationLoading}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {loading =>
          !loading &&
          (props => (
            <>
              <City style={props}>{city}</City>
              <CitySuffix style={props}>
                <i className="icon-map-marker" />
                <span>{citySuffix}</span>
              </CitySuffix>
              <Moon style={props}>
                <img
                  src={moonPhase(lunarCycle).imagePath}
                  alt={moonPhase(lunarCycle).description}
                />
                <span>{moonPhase(lunarCycle).description}</span>
              </Moon>
            </>
          ))
        }
      </Transition>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    isForecastsLoading: state.forecasts.loading,
    isCurrentLocationLoading: state.currentLocation.loading,
    isPictureLoading: state.picture.loading
  };
};

export default connect(mapStateToProps)(Jumbotron);
