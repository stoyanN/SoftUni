global.__baseDir = __dirname;

const env = process.env.NODE_ENV || "development";
const config = require('./config/config')[env];

const express = require('express');
const app = express();

const globalErrorHandler = require('./middlewares/global-error-handler');

require('./config/express')(app);
require('./config/routes')(app);

const dbConnectionPromise = require('./config/database')(config.dbConnectionString);

dbConnectionPromise.then(() => {
    app.use(globalErrorHandler);
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now it's up to you...`));
});