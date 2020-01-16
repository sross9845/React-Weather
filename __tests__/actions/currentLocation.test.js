import * as actionTypes from "../../client/store/actions/actionTypes";
import mockStore from "../../__mocks__/store";
import axios from "axios";
import { getCurrentLocation } from "../../client/store/actions/currentLocation";

describe("getCurrentLocation async action", () => {
  const store = mockStore();

  afterEach(() => {
    store.clearActions();
  });

  it("returns the location data when latitude and longitude are passed", async () => {
    // Mock axios implementation once
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            name: "San Francisco",
            name_suffix: "San Francisco and something else"
          }
        ]
      })
    );
    await store.dispatch(getCurrentLocation(123123123, 12333212));

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.CURRENT_LOCATION_INIT
      },
      {
        type: actionTypes.CURRENT_LOCATION_SUCCESS,
        payload: {
          name: "San Francisco",
          name_suffix: "San Francisco and something else"
        }
      }
    ]);
  });

  it("it returns an error when latitude or longitude are not provided", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.reject({ response: "error" })
    );

    await store.dispatch(getCurrentLocation());

    expect(store.getActions()).toEqual([
      { type: actionTypes.CURRENT_LOCATION_INIT },
      { type: actionTypes.CURRENT_LOCATION_FAIL, payload: "error" }
    ]);
  });
});
