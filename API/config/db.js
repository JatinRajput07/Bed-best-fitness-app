const mongoose = require('mongoose');
const mongoURI = process.env.NODE_ENV === 'development' ? process.env.MONGO_DB : process.env.MONGO_DB_LIVE;
console.log(mongoURI)

const connectDB = async () => {
    try {
        const chalk = (await import('chalk')).default;
        await mongoose.connect(mongoURI, {});

        // mongoose.set('strictPopulate', false);
        console.log(chalk.yellow.bold.underline('Database connected...!'));
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
