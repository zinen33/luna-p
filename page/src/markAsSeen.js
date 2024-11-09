const axios = require("axios");

module.exports = function (event) {
  return async function markAsSeen(boolean, senderId) {
    let form;
    
    if (boolean) {
      form = {
        recipient: {
          id: senderId || event.sender.id,
        },
        sender_action: "mark_seen",
      };
    } else {
      form = {
        recipient: {
          id: senderId || event.sender.id,
        },
        sender_action: "mark_unread",
      };
    }

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