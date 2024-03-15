const TelegramBot = require('node-telegram-bot-api');
const db = require("../db");

const token = '6908630055:AAGt3tN8_WV-Pz1S6AoxN6gE_CaehRg_Lxg';
const bot = new TelegramBot(token, { polling: false });

const BotTele = (req, res) => {
    const {bookTitle,user,jumlah} = req.body;
    const message = `**Reservasi baru** :
    Judul Buku : ${bookTitle}
    Peminjam : ${user}
    Jumlah : ${jumlah}`;

    let chatIdBot

    const query = `SELECT chatId FROM ADMIN`
    db.query(query,(err,result) => {
        if (err) {
            throw err;
          } else {
            res.set("Access-Control-Allow-Origin", "*");
            res.send(result);
            chatIdBot = result
          }
    })

    

    Promise.all(chatIdBot.map(chatId => bot.sendMessage(chatId, message)))
        .then(() => {
            console.log('Semua pesan terkirim');
            res.status(200).send('Pesan terkirim');
        })
        .catch((error) => {
            console.error('Gagal mengirim pesan:', error);
            res.status(500).send('Gagal mengirim pesan');
        });
};

module.exports = {BotTele}