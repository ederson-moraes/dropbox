const fs = require('fs')
const path = require('path')
const Box = require('../models/Box')
const File = require('../models/File')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

class FileController {
    async store(req, res) {
        const box = await Box.findById(req.params.id)

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        try {
            let fileUrl
            let filePath

            if (process.env.NODE_ENV === 'production') {
                // Use S3 for production
                const s3 = new S3Client({
                    region: process.env.AWS_REGION,
                    credentials: {
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    },
                })

                const subPath = `uploads/box-${req.params.id}/`
                const s3Key = `${subPath}${req.file.originalname}`

                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: s3Key,
                    Body: req.file.buffer,
                    ContentType: req.file.mimetype,
                }

                const command = new PutObjectCommand(params)
                await s3.send(command)

                fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`
                filePath = s3Key
            } else {
                // Use local storage for development
                const uploadsPath = path.resolve(__dirname, '..', '..', 'uploads', `box-${req.params.id}`)
                if (!fs.existsSync(uploadsPath)) {
                    fs.mkdirSync(uploadsPath, { recursive: true })
                }

                const localFilePath = path.join(uploadsPath, req.file.originalname)
                fs.writeFileSync(localFilePath, req.file.buffer)

                fileUrl = `${process.env.BASE_URL}:${process.env.PORT}/uploads/box-${req.params.id}/${req.file.originalname}`
                filePath = `uploads/box-${req.params.id}/${req.file.originalname}`
            }

            // Save the file metadata to the database
            const file = await File.create({
                title: req.file.originalname,
                path: filePath,
            })

            // Add the file to the box
            box.files.push(file)
            await box.save()

            // Notify all users in the box about the new file
            req.io.sockets.in(box._id).emit("file", {
                ...file.toObject(),
                url: fileUrl,
            })

            // Return the file metadata with the URL
            return res.json({
                ...file.toObject(),
                url: fileUrl,
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Failed to upload file', details: err.message })
        }
    }
}

module.exports = new FileController()