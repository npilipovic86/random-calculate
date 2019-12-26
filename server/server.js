const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
app.use('/', serveStatic(path.join(__dirname, '/public')))
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
const port = process.env.PORT || 7000
app.listen(port)
console.log(`app is listening on port: http://localhost:${port}`)
