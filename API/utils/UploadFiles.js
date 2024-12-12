const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = './public/uploads';
        // switch (file.fieldname) {
        //     case 'video':
        //     case 'videoTrailer':
        //         folder += '/videos';
        //         break;
        //     case 'image':
        //         folder += '/images';
        //         break;
        //     case 'audio':
        //         folder += '/audio';
        //         break;
        //     case 'pdf':
        //         folder += '/pdfs';
        //         break;
        //     default:
        //         return cb(new Error('Error: Invalid file field.'));
        // }

        fs.mkdirSync(folder, { recursive: true });
        const filePath = path.join(folder, `${Date.now()}-${file.originalname}`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Old file deleted: ${filePath}`);
        }

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

exports.upload = multer({
    storage: storage,
}).fields([
    { name: 'video', maxCount: 1 },
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
]);



exports.generateThumbnail = (videoPath) => {
    return new Promise((resolve, reject) => {
        const thumbnailDir = './public/uploads/thumbnails';
        fs.mkdirSync(thumbnailDir, { recursive: true });

        const outputThumbnail = path.join(thumbnailDir, `thumbnail-${Date.now()}.png`);
        const ffmpegCommand = `ffmpeg -i ${videoPath} -ss 00:00:01 -vframes 1 ${outputThumbnail}`;

        exec(ffmpegCommand, (error) => {
            if (error) {
                return reject(error);
            }
            resolve(outputThumbnail);
        });
    });
};


exports.generateAudioWaveform = (audioPath) => {
    return new Promise((resolve, reject) => {
        const waveformDir = './public/uploads/waveforms';
        fs.mkdirSync(waveformDir, { recursive: true });
        const outputWaveform = path.join(waveformDir, `waveform-${Date.now()}.png`);
        const waveformCommand = `audiowaveform -i "${audioPath}" -o "${outputWaveform}" --pixels-per-second 20 --width 800 --height 150`;
        exec(waveformCommand, (error) => {
            if (error) {
                return reject(error);
            }
            resolve(outputWaveform);
        });
    });
};