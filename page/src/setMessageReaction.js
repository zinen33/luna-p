const axios = require("axios");

module.exports = function (event) {
  return async function setMessageReaction(reaction, messageId) {
    try {
      return await Graph(reaction, messageId);
    } catch (error) {
      console.error("Error sending reaction:", error);
      return null;
    }
  };

  // Note: This api can only be used to a verified business page account
  // It won't work to normal pages

  function Graph(reaction, messageId) {
    return new Promise((resolve, reject) => {
      const payload = {
        access_token: PAGE_ACCESS_TOKEN,
        reaction: reaction,
      };

      axios
        .post(
          `https://graph.facebook.com/v20.0/${messageId}/reactions`,
          payload,
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(
            "Unable to send message:",
            err.response ? err.response.data : err.message,
          );
          reject(err.response ? err.response.data : err.message);
        });
    });
  }
};

// If an error occurs please contact @YanMaglinte
// FB: https://www.facebook.com/yandeva.me