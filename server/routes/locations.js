const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const keys = require("../config/keys");

router.post("/name", async (req, res) => {
  const { city } = req.body;

  if (!city || (city && city.trim().length <= 0)) {
    return res.status(400).json("Input can't be blank");
  }

  const place = await axios.get(
    `https://geocoder.tilehosting.com/q/${city}.js?key=${keys.MAPTILER_API}`
  );

  return res.status(200).json(place.data.results);
});

router.post("/coords", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json("Latitude and Longitude are required");
  }

  const place = await axios.get(
    `https://geocoder.tilehosting.com/r/${longitude}/${latitude}.js?key=${
      keys.MAPTILER_API
    }`
  );

  return res.status(200).json(place.data.results);
});

module.exports = router;
