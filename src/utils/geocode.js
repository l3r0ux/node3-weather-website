const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWVuZWVyb3R0ZXJrb3B4MiIsImEiOiJja2x0aG1kcDAwOHVyMm9vM2g5MTd5ZWV2In0.Afjk_RPwLmnJGeZ6sfn67w&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (!body.features.length) {
      callback("Unable to find location, Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
