const Box = require('../models/Box')

class BoxController {
    async store(req, res) {

        const box = await Box.create(req.body)

        return res.json(box)
    }

    async show(req, res) {
        try {
            const box = await Box.findById(req.params.id).populate({
                path: 'files',
                options: { sort: { createdAt: -1 } }, // Sort files by creation date
            })

            return res.json(box)
        } catch (err) {
            console.error(err)
            return res.status(400).json({ error: 'Box not found', details: err.message })
        }
    }
}

module.exports = new BoxController()