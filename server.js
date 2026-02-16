const express = require('express')
const app = express()
const path = require('path')
const routes = require('./API/Routes.js')
const PORT = 8000

app.use(express.static(path.join(__dirname, 'view')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// API (get, post, delete, and update).
app.use(routes)

// Catch Errors.


app.listen(PORT, () => console.log(`The server running on PORT ${PORT}`))