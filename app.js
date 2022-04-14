require('dotenv').config();
const shortLinks = [
    { code: "mai", link: "https://boticord.top/bot/802987390033330227" },
    { code: "donate", link: "https://sobe.ru/na/makaroni" },
    { code: "boticord", link: "https://boticord.top/?ref=mai" },
    { code: "hack", link: "https://youtu.be/dQw4w9WgXcQ" }
];

const express = require('express');
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

function isAuthorized(req, res, next) {
    const auth = req.headers.authorization;

    if (auth === process.env.API_TOKEN) {
        next();
    } else {
        const err = [
            {
                code: 401,
                reason: "Доступ запрещен"
            }
        ];
        return res.status(401).json(err);
    }
}

app.use('/', express.static(__dirname + '/site'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/site/index.html'))
});

app.get('/api', (req, res) => res.send('На данный момент api находится в разработке'));
app.get('/api/blacklist/:id', isAuthorized, (req, res) => {
    const id = req.params.id
    res.send(`В данный момент данный запрос находится в разработке`)
});

app.get('/api/developer', (req, res) => {
    res.send('TheMisterSenpai | https://github.com/TheMisterSenpai | https://shuoki.top')
});

app.get('/:shortCode', function (req, res) {
    let link = shortLinks.find(link => link.code == req.params.shortCode);
    if (!link) return res.status(404).send('404 Not Found');
    return res.redirect(link.link);
});

app.listen(port, () => console.log(`[LOG] Сервер слушает порт ${port}`));
