# Baconator

Greetings, I am the Baconator! I am a work-in-progress bot designed for Discord.

## Features

- **Slash Commands**: Modern Discord slash command interface
- **Anti-Overwatch System**: Humorous messages when users play Overwatch 2 (with cooldown system)
- **Stream Alerts**: Notifications when users start streaming
- **Keyword Responses**: Automatic replies to specific keywords in messages
- **Activity Logging**: Console logging of user game activities

## Currently Supported Commands:

- **commands** - Supplies the user with a full list of functionality
- **help** - The help command is here to assist you in case you encounter any issues, bugs or malfunctions
- **ping** - Ping Pong
- **server** - Provides information for the current server in use
- **user** - Provides information about the user
- **github** - Links an embed of the GitHub repository for the project
- **decide** - Provides a random yes or no answer to any dilemma

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Discord bot credentials
3. Install dependencies: `npm install`
4. Deploy commands: `node deploy-commands.js`
5. Start the bot: `npm start`

## Recent Improvements

- Fixed command name conflicts (github vs help)
- Improved error handling and null checking
- Added streaming alerts with cooldown system
- Fixed anti-Overwatch cooldown logic
- Enhanced embed formatting for GitHub command
- Updated command list to include all available commands
- Dynamic command deployment from files
- Better environment variable validation

## Useful Development Resources:

- https://discord.com/developers/docs
- https://discord.js.org/
- https://discordjs.guide/
- https://youtube.com/playlist?list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es&si=LxnQGgkraaZ5jW3H
