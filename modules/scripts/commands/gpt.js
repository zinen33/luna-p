const { gpt } = require("gpti");

module.exports.config = {
  name: "gpt",
  author: "Yan Maglinte",
  version: "1.0",
  category: "AI",
  description: "Chat with gpt",
  adminOnly: false,
  usePrefix: false,
  cooldown: 10,
};

module.exports.run = async function ({ event, args }) {
  if (event.type === "message") {
    let prompt = args.join(" ");

    let data = await gpt.v1({
        messages: [],
        prompt: prompt,
        model: "GPT-4",
        markdown: false
    });

    api.sendMessage(data.gpt, event.sender.id).catch(err => {
        console.log(err);
    });
  };
};
