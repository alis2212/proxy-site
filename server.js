const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

// Target website jise aap load karna chahte hain
const TARGET_URL = 'https://stream.aryavidya.cc/';

app.get('/', async (req, res) => {
    try {
        // 1. Us website ka HTML data fetch karo
        const response = await axios.get(TARGET_URL);
        let html = response.data;

        // 2. Cheerio library se HTML ke andar changes karo
        const $ = cheerio.load(html);

        // --- YAHAN AAP APNE HISAB SE CHANGES KAR SAKTE HAIN ---
        // Jaise agar koi heading badalni hai ya koi box/element hatana hai:
        
        // Example 1: Kisi element ko gayab (remove) karna ho:
        // $('#unwanted-box-id').remove();

        // Example 2: Background color ya style badalna ho:
        $('body').append(`
            <style>
                /* Yahan apni marzi ki CSS daal sakte hain jo us website par lag jayegi */
                body { background-color: #0f172a !important; color: #fff !important; }
            </style>
        `);

        // 3. Modified HTML user ko dikhao
        res.send($.html());
    } catch (error) {
        res.status(500).send("Error loading website content: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
