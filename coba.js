const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

// Middleware untuk parsing body dari request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rute untuk reservasi buku
app.post('/reservations', (req, res) => {
    // Logika untuk menyimpan reservasi ke database

    // Logika untuk mengirim pesan WhatsApp ke admin
    sendWhatsAppMessage('087744418414', 'New reservation: ' + req.body.details);
    
    res.status(200).send('Reservasi berhasil.');
});

// Fungsi untuk mengirim pesan WhatsApp
async function sendWhatsAppMessage() {
    message = 'adda'
    phoneNumber = '081946384470'
    const apiUrl = 'https://api.whatsapp.com/send';
    const fullMessage = encodeURIComponent(message);
    const url = `${apiUrl}?phone=${phoneNumber}&text=${fullMessage}`;
    
    try {
        await axios.get(url);
        console.log('Message sent successfully.');
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Mulai server
app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});
