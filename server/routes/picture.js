const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const keys = require("../config/keys");

router.post("/", async (req, res) => {
  const { lat, lon } = req.body;
  const URL = "https://www.flickr.com/services/rest";

  let response;
  try {
    response = await axios.get(URL, {
      params: {
        api_key: keys.FLICKR_API_KEY,
        method: "flickr.photos.search",
        format: "json",
        nojsoncallback: 1,
        group_id: "1463451@N25",
        media: "photos",
        geo_context: 2,
        radius: 3,
        extras: "url_o,url_l",
        lat,
        lon
      }
    });
  } catch (e) {
    return res.status(e.response.status).json({
      message: e.response.statusText,
      fallbackPicture: "/images/background_fallback.jpg"
    });
  }

  const photo = response.data.photos.photo.filter(
    photo =>
      parseInt(photo.width_l) > parseInt(photo.height_l) &&
      parseInt(photo.width_l) >= 1024
  )[0];

  if (!photo) return res.status(200).json("/images/background_fallback.jpg");

  const { farm, server, id, secret } = photo;

  const picturePath = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;

  return res.status(200).json(picturePath);
});

module.exports = router;
