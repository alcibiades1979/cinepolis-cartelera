const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/cartelera', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto('https://www.cinepolis.com.ar/peliculas', { waitUntil: 'networkidle2' });
    await page.waitForSelector('.billboard-movie');

    const data = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.billboard-movie')).map(pelicula => {
        const titulo = pelicula.querySelector('.title')?.innerText?.trim();
        const formatos = Array.from(pelicula.querySelectorAll('.tags span')).map(el => el.innerText.trim());
        const complejos = Array.from(pelicula.querySelectorAll('.cinema-name')).map(el => el.innerText.trim());
        const funciones = Array.from(pelicula.querySelectorAll('.showtimes .hour')).map(el => el.innerText.trim());

        return {
          titulo,
          formatos,
          complejos,
          funciones
        };
      }).filter(p => p.titulo);
    });

    await browser.close();
    res.json({ fecha: new Date().toLocaleDateString('es-AR'), cartelera: data });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, () => console.log('🟢 Server activo en puerto 3000'));
