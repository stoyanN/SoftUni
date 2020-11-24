const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../app-config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
};

userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            next(err);
            return;
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                next(err);
                return;
            }

            user.password = hash;
            next();
        });
    });
});

module.exports = new mongoose.model('User', userSchema);