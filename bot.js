const { Telegraf } = require('telegraf');
const express = require('express');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Add root route handler to fix "Cannot GET /"
app.get('/', (req, res) => {
  res.send('BLACK Mining Bot is running');
});

// Handle /start command
bot.start((ctx) => {
  const chatId = ctx.chat.id;
  bot.telegram.sendMessage(chatId,
    '*don’t BLINK*\n\n' +
    '*Welcome to the BLACK Mining App 🏴*\n\n' +
    'We value your time\n\n' +
    '*Press Start Mining to begin 👾*\n' +
    '_Mining will run automatically in the background, even if you leave the app\\._\n\n' +
    'You can also *boost your mining power* by _submitting daily codes from other users_\\.',
    { parse_mode: 'MarkdownV2' }
  );
});

// Set up webhook
app.use(bot.webhookCallback('/webhook'));
bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/webhook`);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
