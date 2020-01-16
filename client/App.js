import React from "react";
import Layout from "./hoc/Layout";
import Weather from "./containers/Weather";

const App = () => {
  return (
    <Layout>
      <Weather />
    </Layout>
  );
};

export default App;
