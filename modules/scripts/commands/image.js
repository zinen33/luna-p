module.exports.config = {
  name: "image",
  author: "Yan Maglinte",
  version: "1.0",
  category: "Utility",
  description: "Sends an attachment.",
  adminOnly: false, 
  usePrefix: true,
};

module.exports.run = function ({ event, args }) {
  api.graph({
    recipient: {
      id: event.sender.id
    },
    message: {
      attachment: {
        type: 'image', // Specify that the attachment is an image, audio, video, file or etc.
        payload: {
          url: 'https://i.ibb.co/G9RBVz1/Facebook-Page-Bot-Icon.jpg', // Image URL
          is_reusable: true
        }
      }
    }
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.error(err);
  });
}
