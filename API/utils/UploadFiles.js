const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FileType = require('file-type');
const { exec } = require('child_process');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        console.log(file, '========================create_banner==============')
        const buffer = file.buffer; // multer stores buffer if we configure it below
        const type = await FileType.fromBuffer(buffer);
        const mime = type ? type.mime : file.mimetype;
        const fileType = mime.split('/')[0];
        const folder = `./public/uploads/${fileType == "application" ? "pdf" : fileType}s`;

        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

exports.upload = multer({
    storage: storage
}).any();



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