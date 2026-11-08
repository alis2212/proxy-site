const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

const TARGET_URL = 'https://stream.aryavidya.cc/';

app.get('/', async (req, res) => {
    try {
        // Cloudflare bypass karne ke liye public proxy service ka use kar rahe hain
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(TARGET_URL)}`;
        const response = await axios.get(proxyUrl);
        
        // AllOrigins response data ko parse karte hain
        let html = response.data.contents;
        const $ = cheerio.load(html);

        // --- Yahan aap apne hisab se CSS ya changes daal sakte hain ---
        $('body').append(`
            <style>
                body { background-color: #0f172a !important; color: #fff !important; }
            </style>
        `);

        res.send($.html());
    } catch (error) {
        res.status(500).send("Error loading website content: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
