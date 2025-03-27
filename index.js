require("dotenv").config();

const TelegramApi = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Текст кнопки", callback_data: "sdfghjk" }]],
  }),
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Приветствие" },
    { command: "/info", description: "Информация о пользователе" },
    { command: "/site", description: "Сайт" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      return await bot.sendMessage(
        chatId,
        "Добро пожаловать в телеграм бот для заказов"
      );
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}!`
      );
    }

    if (text === "/site") {
      await bot.sendMessage(chatId, "Перейдите на сайт", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Сайт", web_app: { url: "t.me/bobyleva_bot/myapp" } }],
          ],
        },
      });
      const randomNumber = Math.floor(Math.random() * 10);
      chats[chatId] = randomNumber;
      return bot.sendMessage(chatId, "Отгадывай!", gameOptions);
    }
    return bot.sendMessage(chatId, "Я тебя не понимаю, попробуй еще раз!");
  });
};

start();
