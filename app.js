require('dotenv').config()

const express = require('express')
const app = express()
const path = require("path")
const port = process.env.PORT || 3000

function isAuthorized(req, res, next) {
    const auth = req.headers.authorization

    if (auth === process.env.API_TOKEN) {
        next()
    } else{
        res.status(401)
        const err = [
            {
                code: 401,
                reason: "Доступ запрещен"
            }
        ]
        res.json(err)
    }
}

app.use('/', express.static(__dirname + '/site'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/site/index.html'))
})

app.get('/api', (req, res) => res.send('На данный момент api находится в разработке'))

app.get('/api/blacklist/:id', isAuthorized, (req, res) => {
    const id = req.params.id
    res.send(`В данный момент данный запрос находится в разработке`)
})

app.get('/api/developer', (req, res) => {
    res.send('TheMisterSenpai | https://github.com/TheMisterSenpai | https://shuoki.top')
})

app.get('/mai', function (req, res) {
    res.redirect('https://boticord.top/bot/802987390033330227')
})

app.get('/donate', function (req, res) {
    res.redirect('https://qiwi.com/n/THEMISTERSENPAI')
})

app.get('/boticord', function (req, res) {
    res.redirect('https://boticord.top/?ref=mai')
})

app.get('/sprintbit', function (req, res) {
    res.redirect('https://bots.server-discord.com/818020488210939915')
})

app.listen(port, () => console.log(`[LOG] Сервер слушает порт ${port}`))
