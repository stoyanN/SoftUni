const mongoose = require('mongoose');

module.exports = function (dbConnectionString) {
    return mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(data => {
            console.log("Connected to the database successfully!");
            return data;
        });
};