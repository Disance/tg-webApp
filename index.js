const TelegramBot = require('node-telegram-bot-api')
const mysql = require('mysql')
const TOKEN = '7978425757:AAEHdupXvAmdV4Su5IGmDe55IhPXbo6LdxA'
const webAppUrl = 'https://neon-basbousa-156445.netlify.app/'


const bot = new TelegramBot(TOKEN, {
    polling: true
});


const buttonUniversal = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Подписаться на канал №1', url: 'https://t.me/TestForBots1234' }],
            [{text: 'Подписаться на канал №2', url: 'https://t.me/TestForBots1234' }],
            [{text: 'Подписаться на канал №3', url: 'https://t.me/TestForBots1234' }],
            [{text: 'Проверить подписку', callback_data: 'confirm' }]
        ]
    })
};

console.log('zxc')

const channelUsername = '@NotFinSovet';

// Команда для начала взаимодействия
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Отправляем сообщение с приветствием
  bot.sendMessage(chatId, 'Привет! Отправь команду /invite @username, чтобы пригласить пользователя в канал.');
});

// Команда для приглашения пользователя по @username
bot.onText(/\/invite (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = match[1].trim();

  try {
    // Получаем ссылку приглашения в канал
    const inviteLink = await bot.createChatInviteLink(channelUsername, {
      member_limit: 1, // Ограничьте количество пользователей, которых можно пригласить с использованием этой ссылки, если нужно
      expire_date: Math.floor(Date.now() / 1000) + 60 * 60, // Ссылка истекает через час
    });

    // Отправляем ссылку пользователю
    bot.sendMessage(chatId, `Присоединяйся к нашему каналу: ${inviteLink.invite_link}`);

    // Отправляем приглашение пользователю по @username
    bot.sendMessage(username, `Тебя приглашают в канал! Присоединяйся по ссылке: ${inviteLink.invite_link}`);
  } catch (error) {
    console.error('Ошибка при создании ссылки приглашения:', error);
    bot.sendMessage(chatId, 'Произошла ошибка при попытке создать ссылку приглашения.');
  }
});