const axios = require("axios");

module.exports = function (event) {
  return function graph(form) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
          form
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err.response ? err.response.data : err.message);
          reject(err.response ? err.response.data : err.message);
        });
    });
  };
};

// If an error occurs please contact @YanMaglinte
// FB: https://www.facebook.com/yandeva.me