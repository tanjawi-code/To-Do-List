const express = require('express')
const app = express.Router()
const path = require('path')
const routes = require('./API/Routes.js')

app.use(express.static(path.join(__dirname, 'view')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// API (get, post, delete, and update).
app.use(routes)