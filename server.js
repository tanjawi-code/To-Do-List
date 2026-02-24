const express = require('express')
const app = express()
const path = require('path')
const PORT = 8000

app.use(express.static(path.join(__dirname, 'view')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// API (get, post, delete, and update).
app.use('/API/Routes', require('./API/Routes.js'))

// Catch Page Not Found
app.use(require('./middleware/NotFound.js'))

// Catch User Errors.
app.use(require('./middleware/ErrorHandling.js'))


app.listen(PORT, () => console.log(`The server running on PORT ${PORT}`))