const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/bed_best';

const connectDB = async () => {
    try {
        const chalk = (await import('chalk')).default;
        await mongoose.connect(mongoURI, {});
        console.log(chalk.yellow.bold.underline('Database connected...!'));
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;

