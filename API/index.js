require('dotenv').config()
const express = require('express');
const path = require('path')
const connectDB = require('./config/db');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');

const PORT = process.env.PORT || 3000

// DATABASE Connection
connectDB();


const app = express();


// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ROUTERS 
app.use('/', routes);

// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
//   });


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
