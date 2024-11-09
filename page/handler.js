const fs = require("fs");
const path = require("path");
const config = require("../config.json");
const { getTheme } = require("../website/web.js");

module.exports = async function (event) {
  const modulesPath = path.join(__dirname, "../modules/scripts/commands");
  const eventsPath = path.join(__dirname, "../modules/scripts/events");
  const commandFiles = fs.readdirSync(modulesPath).filter(file => file.endsWith(".js"));

  // Check if the sender is an admin
  const isAdmin = config.ADMINS.includes(event.sender.id);

  if (event?.message?.is_echo) {
    event.sender.id = event.recipient.id;
  }

  // Extract command text and arguments from the event
  const messageText = event.message?.text || event.postback?.title || "";
  const [rawCommandName, ...args] = messageText.split(" ");

  // Iterate over command files
  for (const file of commandFiles) {
    const commandPath = path.join(modulesPath, file);
    const command = require(commandPath);

    // Validate command config presence and structure
    if (command && command.config && typeof command.config.name === "string") {
      let commandName;

      // Handle prefix requirement
      if (command.config.usePrefix) {
        if (rawCommandName.startsWith(PREFIX)) {
          commandName = rawCommandName.slice(PREFIX.length).toLowerCase();
        } else {
          continue; // Skip if the command does not start with PREFIX
        }
      } else {
        commandName = rawCommandName.toLowerCase();
      }

      // Check if adminOnly is true and sender is not admin
      if (commandName.includes(command.config.name) && command.config.adminOnly && !isAdmin) {
        // Optionally send a message to the user if they are not an admin
        api.sendMessage("You do not have permission to use this command.", event.sender.id);
        continue; // Skip the execution of the command if not an admin
      }

      // Match command name and execute
      if (command.config.name.toLowerCase() === commandName) {
        console.log(getTheme().gradient(`SYSTEM:`), `${command.config.name} command was executed!`);
        try {
          // Call the `run` function instead of the default function
          await command.run({ event, args });
        } catch (error) {
          console.error(`Error executing ${command.config.name}:`, error);
        }
      }
    } else {
      console.log(`Skipped command: ${file} - missing or invalid config.`);
    }
  }

  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
  for (const file of eventFiles) {
    const eventModulePath = path.join(eventsPath, file);
    const ev = require(eventModulePath);

    // Check if selfListen is set to false and event is an echo message
    if (!ev.config?.selfListen && event.message?.is_echo) return;

    try {
      await ev.run({ event, args });
    } catch (error) {
      console.error(`Error executing event handler ${file}:`, error);
    }
  }
};

// If an error occurs, please mention @YanMaglinte on Facebook
// FB: https://www.facebook.com/yandeva.me