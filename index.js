require('dotenv').config();

const TelegramApi = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Текст кнопки', callback_data: 'sdfghjk'}]
        ]
    })
}

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Приветствие" },
    { command: "/info", description: "Информация о пользователе" },
    { command: "/game", description: "Игра угадай цифру" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://cdn2.combot.org/cs1winmoments_by_e4zybot/webp/6xf09f98b4.webp"
      );
      return bot.sendMessage(
        chatId,
        "Добро пожаловать в телеграм бот Нины Бобылевой!"
      );
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}!`
      );
    }

    if (text === '/game') {
        await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!');
        const randomNumber = Math.floor(Math.random() * 10);
        chats[chatId] = randomNumber;
        return bot.sendMessage(chatId, 'Отгадывай!', gameOptions);
    }
    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
  });
};

start();
