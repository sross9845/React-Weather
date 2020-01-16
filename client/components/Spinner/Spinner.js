import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;

  & > div {
    background-color: #fff;
    height: 100%;
    width: 6px;
    display: inline-block;

    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  & .rect1 {
    margin-right: 3px;
  }

  & .rect2 {
    margin-right: 3px;
    animation-delay: -1.1s;
  }

  & .rect3 {
    margin-right: 3px;
    animation-delay: -1s;
  }

  & .rect4 {
    margin-right: 3px;
    animation-delay: -0.9s;
  }

  & .rect5 {
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
`;

const Spinner = () => {
  return (
    <Container>
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </Container>
  );
};

export default Spinner;
