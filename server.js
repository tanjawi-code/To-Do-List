const express = require('express')
const app = express.Router()
const path = require('path')

app.use(express.static(path.join(__dirname, 'view')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))