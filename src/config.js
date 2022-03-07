const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint_forecast: process.env.WEATHER_API_URL,
  endpoint_geocode: process.env.GEO_API_URL,
  masterKey_geocode: process.env.GEO_API_KEY
};