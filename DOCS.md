# API Documentation
## Basic Messaging

### `api.sendMessage(message, senderID)`

Sends a text message to a specified user.

#### Parameters:
- `message` (string): The message to send.
- `senderID` (string): The ID of the message recipient.

#### Usage:
```javascript
api.sendMessage("Hello", event.sender.id);
```

or, with a promise:
```javascript
api.sendMessage("Hello", event.sender.id).then((res) => {
  console.log(res);
});
```

---

### `api.sendTypingIndicator(isTyping, senderID)`

Activates or deactivates the typing indicator for a user.

#### Parameters:
- `isTyping` (boolean): Set to `true` to show the typing indicator, or `false` to hide it.
- `senderID` (string): The ID of the user for whom the typing indicator is being set.

#### Usage:
Enable the typing indicator:
```javascript
api.sendTypingIndicator(true, event.sender.id);
```

Disable the typing indicator:
```javascript
api.sendTypingIndicator(false, event.sender.id);
```

or, with a promise:
```javascript
api.sendTypingIndicator(false, event.sender.id).then((res) => {
  console.log(res);
});
```

---

### `api.setMessageReaction`

This API function allows you to send reactions to Facebook messages using the Facebook Graph API. It is intended for use with verified business pages only and will not work on normal Facebook pages.

## Features

- **Send Reactions**: Allows you to send reactions like `LIKE`, `LOVE`, `HAHA`, `WOW`, `SAD`, and `ANGRY` to messages on a verified business page.
- **Error Handling**: Provides error handling and logs any issues that occur during the process.

## Requirements

- **Verified Business Page**: This API can only be used with a verified business page. It will not work on regular Facebook pages.
- **PAGE_ACCESS_TOKEN**: Ensure that you have a valid page access token with the necessary permissions to interact with the Facebook Graph API.

## Usage

### 1. Import and Setup

```javascript
const setMessageReaction = require('path_to_this_file');
```

### 2. Call the Function

Use the `setMessageReaction` function to send a reaction to a message by providing the desired reaction type and message ID.

#### Parameters:
- `reaction` (string): The type of reaction you want to send. Supported values are: `LIKE`, `LOVE`, `HAHA`, `WOW`, `SAD`, and `ANGRY`.
- `messageId` (string): The ID of the message to which you want to react.

#### Example:

```javascript
const reaction = 'LIKE'; // or 'LOVE', 'HAHA', etc.
const messageId = '1234567890123456'; // The ID of the message to react to

setMessageReaction(reaction, messageId)
  .then(response => {
    console.log('Reaction sent:', response);
  })
  .catch(error => {
    console.error('Error sending reaction:', error);
  });
```

### 3. Error Handling

If the API call encounters an error, it will log the error message and return `null`.

#### Example of error:

```javascript
Error sending reaction: Unable to send message: { error details }
```

---

## Notes

- This API function only works for verified business pages.

---

### `api.markAsSeen(isSeen, senderID)`

Marks a message as seen or unseen for a user.

#### Parameters:
- `isSeen` (boolean): Set to `true` to mark the message as seen, or `false` to mark it as unseen.
- `senderID` (string): The ID of the user for whom the message is being marked.

#### Usage:
To mark a message as seen:
```javascript
api.markAsSeen(true, event.sender.id);
```

To mark a message as unseen:
```javascript
api.markAsSeen(false, event.sender.id);
```

---

## Advanced Messaging with `api.graph`

The `api.graph` method allows for flexible message formatting, enabling you to send image attachments, buttons, and generic templates.

### Sending Button Template

Sends a message with buttons that perform various actions (like opening URLs or triggering postback events).

```javascript
api.graph({
  recipient: { id: event.sender.id },
  message: {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: "What would you like to do?",
        buttons: [
          {
            type: 'web_url',
            url: "https://www.facebook.com/yandeva.me",
            title: "Visit Profile"
          },
          {
            type: 'postback',
            title: "Say Hello",
            payload: "HELLO_PAYLOAD"
          }
        ]
      }
    }
  }
});
```

### Sending Image Attachment

Sends an image attachment to the user.

```javascript
api.graph({
  recipient: { id: event.sender.id },
  message: {
    attachment: {
      type: 'image',
      payload: {
        url: "https://example.com/image.jpg",
        is_reusable: true // Set to true to reuse the image
      }
    }
  }
});
```

### Sending Generic Template

Sends a carousel-style message with multiple items, each with an image, title, subtitle, and buttons.

```javascript
api.graph({
  recipient: { id: event.sender.id },
  message: {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: "First Item",
            image_url: "https://example.com/image1.jpg",
            subtitle: "This is the first item",
            buttons: [
              {
                type: 'web_url',
                url: "https://example.com",
                title: "View Item"
              },
              {
                type: 'postback',
                title: "More Info",
                payload: "MORE_INFO_ITEM_1"
              }
            ]
          },
          {
            title: "Second Item",
            image_url: "https://example.com/image2.jpg",
            subtitle: "This is the second item",
            buttons: [
              {
                type: 'web_url',
                url: "https://example.com",
                title: "View Item"
              },
              {
                type: 'postback',
                title: "More Info",
                payload: "MORE_INFO_ITEM_2"
              }
            ]
          }
        ]
      }
    }
  }
});
```

### Sending Quick Replies

Sends a message with quick reply buttons that disappear after being tapped.

```javascript
api.graph({
  recipient: { id: event.sender.id },
  message: {
    text: "Choose an option:",
    quick_replies: [
      {
        content_type: "text",
        title: "Option 1",
        payload: "OPTION_1"
      },
      {
        content_type: "text",
        title: "Option 2",
        payload: "OPTION_2"
      }
    ]
  }
});
```

Each of these examples demonstrates a different format of messaging to engage users with images, buttons, or dynamic templates. Adjust the templates as needed to fit your application!

## Setting Up "Get Started" Payload

Facebook Messenger allows you to set up a "Get Started" button for new users. When clicked, it sends a payload you can use to initiate a welcome flow.

### Configuring the "Get Started" Button

First, set up the "Get Started" button in your Facebook Page settings or by calling the Facebook API to configure it programmatically.

```javascript
api.graph({
  get_started: { payload: "GET_STARTED_PAYLOAD" }
});
```

### Handling the "Get Started" Payload

When a user clicks the "Get Started" button, a payload is sent. You can use it to send an introductory message or guide the user through initial setup steps.

```javascript
function handlePayload(payload, senderID) {
  if (payload === "GET_STARTED_PAYLOAD") {
    api.sendMessage("Welcome! I'm here to help you.", senderID);
    api.sendMessage("Type 'help' to see what I can do.", senderID);
  }
}

// Example usage
if (event.postback && event.postback.payload) {
  handlePayload(event.postback.payload, event.sender.id);
}
```

---

Here's a sample `README.md` that outlines the differences between **Commands** and **Events** with example code and property explanations.

---

# Commands and Events Differences

In this framework, **Commands** and **Events** serve different purposes, each having unique properties and behaviors that cater to distinct types of interactions. This document explains the differences and provides examples to help understand how to set up each.

## Commands

Commands are user-triggered actions that require specific keywords or prefixes to be recognized. They are typically used for straightforward, user-initiated requests, like `!greet` or `/help`, and need to match the configured command name in order to activate.

### Key Properties for Commands

Commands are structured with specific properties to handle how they respond to user inputs:

- **name**: The name of the command that triggers the execution.
- **usePrefix**: A boolean that defines whether the command requires a prefix (e.g., `!` or `/`) to be recognized.
- **bodyIndex**: Defines the matching behavior for the command name (e.g., starts with, exact match).
- **adminOnly**: Restricts command usage to administrators if set to `true`.

### Command Example

```javascript
module.exports.config = {
  name: "greet",
  author: "YourName",
  version: "1.0",
  description: "Sends a greeting message.",
  adminOnly: false,
  usePrefix: true,
};

module.exports.run = function ({ event, args }) {
  api.sendMessage(`Hello, ${args.join(" ")}!`, event.sender.id);
};
```

### How Commands Work

- **Triggering**: Commands trigger based on matching text (like `!greet`) with the `name` property. The `usePrefix` property determines if the command requires a prefix (e.g., `!greet` vs. just `greet`).

### When to Use Commands
Commands are ideal for specific, user-directed actions where structured responses are required, such as:
- **Bot Features**: `/help` to list commands or `/profile` to show user details.
- **Quick Interactions**: `/greet` to send a greeting message or `/status` to check bot status.

## Events

Events are general actions that the bot listens for, often without requiring specific prefixes or command names. They are more versatile and are used to handle system-wide interactions, background processes, and message handling that isn’t dependent on user commands.

### Key Properties for Events

Events have configurations that control when they activate:

- **name**: Identifies the event (informational, not used for matching).
- **selfListen**: Determines if the event should handle messages sent by the bot itself.
- **description**: Describes the event’s purpose.

### Event Example

```javascript
module.exports.config = {
  name: "Message Logger",
  author: "YourName",
  version: "1.0",
  description: "Logs every message received.",
  selfListen: false, // Skip handling messages sent by the bot
};

module.exports.run = function ({ event, args }) {
  if (event.type === 'message') {
    console.log(`Received message: ${event.message.text}`);
  }
};
```

### How Events Work

- **Triggering**: Events automatically listen to certain actions or message types, such as new messages, reactions, or postbacks, and don’t require specific text or prefixes to activate.
- **Self-Listening Control**: The `selfListen` property determines if events should handle messages that are bot echoes.
  - If `selfListen` is `false` and the message is an echo (`event.message.is_echo`), the event won’t execute.
- **Flexible Context**: Events are designed to handle broader contexts, often listening for any relevant actions in the system rather than specific keywords.

### When to Use Events

Events are suited for background tasks, global listeners, and anything that doesn’t require specific user input:
- **Message Logging**: Log every incoming message.
- **Background Operations**: Automatically handle user reactions, mark messages as read, or handle postbacks.
- **System Monitoring**: Track interactions that happen passively without user intervention.

## Summary of Differences

| Aspect       | Commands                                      | Events                                    |
|--------------|----------------------------------------------|-------------------------------------------|
| **Trigger**  | User-initiated, needs specific text          | Passively listens for actions or messages |
| **Prefix**   | Requires a prefix if `usePrefix` is `true`   | Does not need a prefix                    |
| **Use Case** | Feature-triggered actions, user commands     | Background tasks, system actions, global listeners |
| **Config Properties** | `name`, `usePrefix`, `adminOnly` | `name`, `selfListen`, `description` |

By keeping Commands and Events distinct, the framework allows targeted control over user-triggered interactions and system-wide listeners.

--- 

### Event Types

Below are the available event types that are triggered during interactions with the bot:

| Event Type          | Description                                                         |
|---------------------|---------------------------------------------------------------------|
| `message`           | A simple message sent by a sender.                                  |
| `message_reply`     | Triggered when a sender replies to a message.                       |
| `mark_as_seen`      | Logs when a sender marks a message as seen.                         |
| `attachments`       | Triggered when an attachment (image, audio, video, or file) is sent. |
| `postback`          | Triggered when a button is clicked.                                 |
| `quick_reply`       | Triggered when a quick reply button is clicked.                     |
| `message_reaction`  | Triggered when a sender reacts to a message.                        |

This gives the user context on what the event types are and how they are triggered.

---

### Available Themes
- Fiery
- Hacker
- Aqua
- Blue

--- 

Author: [Yan Maglinte](https://www.facebook.com/yandeva.me)