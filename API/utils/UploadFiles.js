const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');

const storage = multer.memoryStorage();

exports.upload = multer({
    storage: storage
}).any();



exports.generateThumbnail = (videoInput) => {
    return new Promise((resolve, reject) => {
        const thumbnailDir = path.join(os.tmpdir(), 'bed-best-thumbnails');
        fs.mkdirSync(thumbnailDir, { recursive: true });

        let videoPath = videoInput;
        let tempVideoPath = null;

        if (videoInput && videoInput.buffer) {
            tempVideoPath = path.join(os.tmpdir(), `${Date.now()}-${videoInput.originalname}`);
            fs.writeFileSync(tempVideoPath, videoInput.buffer);
            videoPath = tempVideoPath;
        }

        const outputThumbnail = path.join(thumbnailDir, `thumbnail-${Date.now()}.png`);
        const ffmpegCommand = `ffmpeg -i "${videoPath}" -ss 00:00:01 -vframes 1 "${outputThumbnail}"`;

        exec(ffmpegCommand, (error) => {
            if (tempVideoPath && fs.existsSync(tempVideoPath)) {
                fs.unlinkSync(tempVideoPath);
            }
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
