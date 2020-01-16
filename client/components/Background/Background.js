import React from "react";
import styled from "styled-components";
import { Transition, animated } from "react-spring/renderprops";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const Container = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: -10;

  span {
    width: 100%;
    height: 100%;
    img {
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
      filter: blur(10px);
      transform: scale(1.1);
    }
  }
`;

const Background = ({ picture }) => {
  return (
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
          <Container style={props}>
            <LazyLoadImage effect="opacity" src={picture} />
          </Container>
        ))
      }
    </Transition>
  );
};

export default Background;
