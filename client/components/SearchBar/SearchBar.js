import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { searchLocations, searchReset } from "../../store/actions/locations";
import debounce from "lodash.debounce";
import Results from "./Results/Results";

const Container = styled.div`
  grid-area: searchbar;
  display: grid;
  grid-template-areas: "form" "results";
  margin: 20px auto;
  max-width: 50rem;
  width: 95%;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    width: 70%;
  }
`;

const Form = styled.form`
  position: relative;
  grid-area: form;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 100px 0 20px;
  border: 0;
  border-radius: 50px;
  background-color: #1e202c;
  color: whitesmoke;
  box-shadow: 3px 3px 3px black;

  &::placeholder {
    color: #b7b7b7;
  }

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  padding: 10px 30px;
  font-weight: bold;
  border-radius: 50px;
  background-color: #009ad8;
  border: none;
  color: white;
`;

const SearchBar = ({
  setLocation,
  locations,
  searchLocations,
  searchReset
}) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    document.addEventListener("click", closeResults);
  }, []);

  const closeResults = () => {
    if (document.activeElement.id !== "input") {
      setShowResults(false);
    }
  };

  const onChangeHandler = debounce(async city => {
    if (!city || (city && city.trim().length <= 0)) {
      searchReset();
      setShowResults(false);
      return;
    }

    await searchLocations(city);
    setShowResults(true);
  }, 500);

  return (
    <Container>
      <Form
        onSubmit={async e => {
          e.preventDefault();
          onChangeHandler.cancel();
          await searchLocations(e.target.city.value);
          setShowResults(true);
        }}
      >
        <Input
          id="input"
          autoComplete="off"
          onChange={e => onChangeHandler(e.target.value)}
          onClick={() =>
            locations.data.length > 0 ? setShowResults(true) : null
          }
          name="city"
          placeholder="Find your location..."
        />
        <Button type="submit">Find</Button>
      </Form>
      <Results
        setLocation={setLocation}
        show={showResults && !locations.loading}
        results={locations.data}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    locations: state.locations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchLocations: city => dispatch(searchLocations(city)),
    searchReset: () => dispatch(searchReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
