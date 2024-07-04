// import TelegramBot, { Message, CallbackQuery } from 'node-telegram-bot-api';
// import dotenv from "dotenv"

// dotenv.config()

// // Replace with your own token from BotFather
// const token: string = process.env.BOT_API_KEY!;
// const bot = new TelegramBot(token, { polling: true });

// // Handle /start command
// bot.onText(/\/start/, (msg: Message) => {
//   const chatId = msg.chat.id;
//   const username = msg.from?.first_name || 'Player';

//   const welcomeMessage = `Welcome ${username} to "Don't let the ball fall!" where the only rule is don't let the ball fall. Press play to start and let's see how many touches you are able to make.`;

//   const options = {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           { text: 'Play', web_app: { url: 'https://tma-ball-game.vercel.app/' } } // Replace with your web app URL
//         ]
//       ]
//     }
//   };

//   bot.sendMessage(chatId, welcomeMessage, options);
// });

// // Handle callback queries (if needed for other functionalities)
// bot.on('callback_query', (callbackQuery: CallbackQuery) => {
//   const message = callbackQuery.message;
//   if (!message) return;
//   const chatId = message.chat.id;

//   if (callbackQuery.data === 'play') {
//     // Handle other play related logic if necessary
//   }

//   // Acknowledge the callback query
//   bot.answerCallbackQuery(callbackQuery.id);
// });


