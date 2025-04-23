const mongoose = require('mongoose')

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})

// Virtual property to generate the file URL
File.virtual('url').get(function () {
    if (process.env.NODE_ENV === 'production') {
        // S3 URL for production
        const bucketName = process.env.AWS_BUCKET_NAME
        const region = process.env.AWS_REGION
        return `https://${bucketName}.s3.${region}.amazonaws.com/${this.path}`
    } else {
        // Local URL for development
        return `${process.env.BASE_URL}:${process.env.PORT}/${this.path}`
    }
})

module.exports = mongoose.model('File', File)