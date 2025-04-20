const Box = require('../models/Box')
const File = require('../models/File')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3') // Import AWS SDK v3

class FileController {
    async store(req, res) {
        const box = await Box.findById(req.params.id)

        // Configure the S3 client
        const s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        })

        try {
            // Define the S3 bucket path
            const subPath = `uploads/box-${req.params.id}/`
            const s3Key = `${subPath}${req.file.originalname}`

            // Upload the file to S3
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: s3Key, // File path in the bucket
                Body: req.file.buffer, // Use the file buffer from multer
                ContentType: req.file.mimetype, // Set the content type
            }

            const command = new PutObjectCommand(params)
            await s3.send(command)

            // Generate the file URL
            const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`

            // Save the file metadata to the database
            const file = await File.create({
                title: req.file.originalname,
                path: s3Key, // Save the S3 key as the path
            })

            // Add the file to the box
            box.files.push(file)
            await box.save()

            // Notify all users in the box about the new file
            req.io.sockets.in(box._id).emit("file", {
                ...file.toObject(),
                url: fileUrl, // Include the generated URL in the emitted event
            })

            // Return the file metadata with the URL
            return res.json({
                ...file.toObject(),
                url: fileUrl, // Include the generated URL in the response
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Failed to upload file to S3', details: err.message })
        }
    }
}

module.exports = new FileController()