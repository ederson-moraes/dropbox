const multer = require('multer')

module.exports = {
    storage: multer.memoryStorage(), // Store files in memory
}