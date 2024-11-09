const axios = require("axios");

module.exports = function (event) {
  return async function sendMessage(text, senderID) {
    const recipientID = senderID || event.senderID;

    // Function to split the message into chunks
    // The reason for this is that Facebook's API has a limit of 2000 characters
    // Splitting is the best option so please don't change this
    // @YanMaglinte
    
    function splitMessage(text) {
      const maxLength = 2000;
      const messages = [];
      let remainingText = text;

      while (remainingText.length > maxLength) {
        // Find the last newline character within the maxLength limit
        let splitIndex = remainingText.lastIndexOf("\n", maxLength);

        if (splitIndex === -1) {
          splitIndex = maxLength;
        } else {
          splitIndex += 1; // Include the newline character in the split
        }

        messages.push(remainingText.slice(0, splitIndex).trim());
        remainingText = remainingText.slice(splitIndex).trim();
      }

      messages.push(remainingText);
      return messages;
    }

    // The api.sendMessage can only send texts for the meanwhile, please use the api.graph() in sending links, payload, attachments, and etc.
    
    const messages = splitMessage(text);

    for (const message of messages) {
      const form = {
        recipient: { id: recipientID },
        message: { text: message },
        messaging_type: "RESPONSE",
      };

      try {
        await Graph(form);
      } catch (err) {
        return err;
      }
    }
  };

  function Graph(form) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
          form,
        )
        .then(async (res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err.response ? err.response.data : err.message);
          reject(err.response ? err.response.data : err.message);
        });
    });
  }
};

// If an error occurs please contact @YanMaglinte
// FB: https://www.facebook.com/yandeva.me