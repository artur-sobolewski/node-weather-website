const request = require('request');
const env = require('../config');

const geocode = (address, callback) => {
    const url = env.GEO_API_URL + encodeURIComponent(address) + ".json?access_token=" + env.GEO_API_KEY + "&limit=1&language=ang";
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect location service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
    });
}

module.exports = geocode;