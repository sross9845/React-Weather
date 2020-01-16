import React from "react";
import styled, { ThemeProvider } from "styled-components";

const theme = {
  mediaQueryMinWidth: "60rem",
  colors: { darkGray: "#1e202c", lightBlue: "#009ad8" }
};

const Container = styled.div`
  margin: auto;
  height: 100%;
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default Layout;
