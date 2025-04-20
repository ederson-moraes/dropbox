const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = express.Router()

const BoxController = require('./controllers/BoxController')
const FileController = require('./controllers/FileController')


routes.get("/", (req, res) => {
    res.json({ message: "Hello World!" })
}
)
routes.post("/box", BoxController.store)
routes.get("/box/:id", BoxController.show)
routes.post(
    "/box/:id/files",
    multer(multerConfig).single('file'),
    FileController.store
)

module.exports = routes