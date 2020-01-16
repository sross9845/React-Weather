import clearDay from "../assets/images/weather/clear.svg";
import clearNight from "../assets/images/weather/nt_clear.svg";
import rain from "../assets/images/weather/rain.svg";
import snow from "../assets/images/weather/snow.svg";
import sleet from "../assets/images/weather/sleet.svg";
import wind from "../assets/images/weather/wind.svg";
import fog from "../assets/images/weather/fog.svg";
import cloudy from "../assets/images/weather/cloudy.svg";
import partlyCloudyDay from "../assets/images/weather/partlycloudy.svg";
import partlyCloudyNight from "../assets/images/weather/nt_partlycloudy.svg";
import thunderstorm from "../assets/images/weather/tstorms.svg";
import tornado from "../assets/images/weather/tornado.svg";
import unknown from "../assets/images/weather/unknown.svg";

export default forecast => {
  switch (forecast) {
    case "clear-day":
      return clearDay;
    case "clear-night":
      return clearNight;
    case "rain":
      return rain;
    case "snow":
      return snow;
    case "sleet":
      return sleet;
    case "wind":
      return wind;
    case "fog":
      return fog;
    case "cloudy":
      return cloudy;
    case "partly-cloudy-day":
      return partlyCloudyDay;
    case "partly-cloudy-night":
      return partlyCloudyNight;
    case "hail":
      return sleet;
    case "thunderstorm":
      return thunderstorm;
    case "tornado":
      return tornado;
    default:
      return unknown;
  }
};
