require('dotenv').config()
var MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.DB_CONN, function(err, client) {
    if(!err){
        console.log('[LOG] БД подключена')
    } else{
        console.log(`[LOG] БД не была подключена из-за ошибки: ${err}`)
    }
})

const express = require('express')
const app = express()
const port = process.env.PORT

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

app.get('/', (req, res) => res.send('Метро Люблино работаем! Список заблокированных /blacklist/:id'))

app.get('/blacklist/:id', isAuthorized, (req, res) => {
    const id = req.params.id
    res.send(`Привет ${id}`)

})
app.listen(port, () => console.log(`[LOG] Сервер слушает порт ${port}`))