import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Transition, animated } from "react-spring/renderprops";

const Container = styled(animated.div)`
  grid-area: weekday;
  display: grid;
  grid-template-areas: "weekday0 weekday1" "weekday2 weekday3" "weekday4 weekday5";
  grid-template-columns: auto;

  #weekday0,
  #weekday2,
  #weekday4 {
    border-left: none;
  }

  #weekday1,
  #weekday3,
  #weekday5 {
    border-left: 1px solid #05050559;
  }

  @media (min-width: 40rem) {
    grid-template-areas: "weekday0 weekday1 weekday2" "weekday3 weekday4 weekday5";

    #weekday0,
    #weekday3 {
      border-left: none;
    }

    #weekday1,
    #weekday2,
    #weekday4,
    #weekday5 {
      border-left: 1px solid #05050559;
    }
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    grid-template-areas: "weekday0 weekday1 weekday2 weekday3 weekday4 weekday5";

    #weekday0,
    #weekday1,
    #weekday2,
    #weekday3,
    #weekday4,
    #weekday5 {
      border-left: 1px solid #05050559;
    }
  }
`;

const WeekdayContainer = ({ isForecastsLoading, children }) => {
  return (
    <Transition
      items={isForecastsLoading}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {loading =>
        !loading && (props => <Container style={props}>{children}</Container>)
      }
    </Transition>
  );
};

const mapStateToProps = state => {
  return {
    isForecastsLoading: state.forecasts.loading
  };
};

export default connect(mapStateToProps)(WeekdayContainer);
