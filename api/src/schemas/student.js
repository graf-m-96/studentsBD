'use strict';

const mognoose = require('mongoose');

const studentSchema = new mognoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        validate: value => typeof value === 'number' && value % 1 === 0 && value >= 0,
        index: true,
        default: 0
    }
});

// hack for autocomplete in ws
module.exports.Student = mognoose.model('Student', studentSchema);
