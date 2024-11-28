require('dotenv').config()
const express = require('express');
const path = require('path')
const cors = require('cors')
const connectDB = require('./config/db');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');


const PORT = process.env.PORT || 3000

// DATABASE Connection
connectDB();


const app = express();


// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Security: HTTP headers
app.use(helmet());

app.use(
    cors({
        origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    })
);


// Performance: Gzip Compression
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);


// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// ROUTERS 
app.use('/', routes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


// GLOBLE ERROR HANDLER
app.use(errorHandler);

// CREATE SERVER AND RUNNING PORT
app.listen(PORT, async () => {
    const chalk = (await import('chalk')).default;
    console.log(chalk.yellow.underline.bold(`Server is running on port -> ${PORT}`));
});


process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});
