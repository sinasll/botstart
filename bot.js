const { Telegraf } = require('telegraf');
const express = require('express');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Handle /start command
bot.start((ctx) => {
  const welcomeMessage = `
*Welcome to the BLACK Mining App*

Press *Start Mining* to begin\. Mining will continue running in the background automatically\.

You can also *boost your mining power* by submitting daily codes from other users\.
  `;
  
  ctx.reply(welcomeMessage.trim(), { parse_mode: 'MarkdownV2' });
});

// Set up webhook
app.use(bot.webhookCallback('/webhook'));
bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/webhook`);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
