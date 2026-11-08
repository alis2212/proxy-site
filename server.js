const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

const TARGET_URL = 'https://stream.aryavidya.cc/';

app.get('/', async (req, res) => {
    try {
        // Browser jaisa User-Agent header bhej rahe hain taaki 403 Forbidden error na aaye
        const response = await axios.get(TARGET_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });

        let html = response.data;
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
