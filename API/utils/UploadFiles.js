const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = './public/uploads';
        switch (file.fieldname) {
            case 'video':
            case 'videoTrailer':
                folder += '/videos';
                break;
            case 'image':
                folder += '/images';
                break;
            case 'audiobook':
                folder += '/audiobooks';
                break;
            case 'pdf':
                folder += '/pdfs';
                break;
            default:
                return cb(new Error('Error: Invalid file field.'));
        }

        // Create folder if it doesn't exist
        fs.mkdirSync(folder, { recursive: true });

        // Check if a file with the same name already exists
        const filePath = path.join(folder, `${Date.now()}-${file.originalname}`);
        if (fs.existsSync(filePath)) {
            // If file exists, delete it before uploading new one
            fs.unlinkSync(filePath);
            console.log(`Old file deleted: ${filePath}`);
        }

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const imageFileTypes = /jpeg|png|jpg/;
    const videoFileTypes = /mp4|mkv|avi|mov|wmv|flv|webm|x-matroska/;
    const audioFileTypes = /mp3|wav|m4a/;
    const pdfFileTypes = /pdf/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    switch (file.fieldname) {
        case 'image':
            if (imageFileTypes.test(extname) && mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Error: Only image files (JPEG, PNG, JPG) are allowed for the image!'));
            }
            break;
        case 'video':
            if (videoFileTypes.test(extname) && mimetype.startsWith('video/')) {
                cb(null, true);
            } else {
                cb(new Error('Error: Only video files (MP4, MKV, AVI, etc.) are allowed for video!'));
            }
            break;
        case 'audiobook':
            if (audioFileTypes.test(extname) && mimetype.startsWith('audio/')) {
                cb(null, true);
            } else {
                cb(new Error('Error: Only audio files (MP3, WAV, M4A) are allowed for audiobooks!'));
            }
            break;
        case 'pdf':
            if (pdfFileTypes.test(extname) && mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Error: Only PDF files are allowed for documents!'));
            }
            break;
        default:
            cb(new Error('Error: Invalid file field.'));
    }
};

exports.upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).fields([
    { name: 'video', maxCount: 1 },
    { name: 'image', maxCount: 1 },
    { name: 'audiobook', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
]);
