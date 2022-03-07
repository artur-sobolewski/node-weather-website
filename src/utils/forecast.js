const request = require('request');
const env = require('../config');

const forecast = (latitude, longitude, callback) => {
    const url = env.WEATHER_API_URL + "&query=" + latitude + "," + longitude;
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather service!', undefined);
        } else if (body.error) {
            callback("Unable to find location. " + body.error.info, undefined);
        } else {
            const {temperature, feelslike, precip, weather_descriptions} = body.current;
            callback(undefined, "There is currently " + temperature + " degrees out. \
    It feels like " + feelslike + " degrees out. \
    There is " + precip + " mm precipitation level. \
    It's " + weather_descriptions[0]);
        }
    });
}

module.exports = forecast;