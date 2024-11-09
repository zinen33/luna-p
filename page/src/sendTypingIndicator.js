const axios = require("axios");

module.exports = function (event) {
  return async function sendTypingIndicator(isTyping, userId) {
    const senderAction = isTyping ? "typing_on" : "typing_off";
    const form = {
      recipient: {
        id: userId || event.sender.id,
      },
      sender_action: senderAction,
    };

    try {
      return await Graph(form);
    } catch (err) {
      return err;
    }
  };

  function Graph(form) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
          form,
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(
            "Unable to send Typing Indicator:",
            err.response ? err.response.data : err.message,
          );
          reject(err.response ? err.response.data : err.message);
        });
    });
  }
};

// If an error occurs please contact @YanMaglinte
// FB: https://www.facebook.com/yandeva.me