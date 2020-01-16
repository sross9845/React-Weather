const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const keys = require("../config/keys");

router.post("/", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json("Latitude and longitude are required");
  }

  const URL = `https://api.darksky.net/forecast/${
    keys.DARK_SKY_API
  }/${latitude},${longitude}`;
  const forecast = await axios.get(URL, {
    params: { exclude: "minutely,hourly,alerts,flags", units: "auto" }
  });

  return res.status(200).json(forecast.data);
});

module.exports = router;
