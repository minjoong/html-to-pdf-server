const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

async function htmlToPdf() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com', {waitUntil: 'networkidle2'});
    const pdf = await page.pdf({format: 'A4'});
    await browser.close();

    return pdf;
}

router.get('/', async function(req, res, next) {
    const pdf = await htmlToPdf();
    res.contentType("application/pdf");
    res.send(pdf);
});

module.exports = router;
