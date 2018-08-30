'use strict';

const Student = require('../schemas/student').Student;

module.exports.StudentManager = class StudentManager {
    static create({ name, surname, rating }) {
        return new Student({ name, surname, rating }).save();
    }

    static getById(id) {
        return Student.findById(id);
    }

    static getAll() {
        return Student.find();
    }

    static editById(id, parameters) {
        return Student.findByIdAndUpdate({ _id: id }, parameters, { new: true });
    }

    static deleteById(id) {
        return Student.findByIdAndRemove({ _id: id });
    }

    static deleteAll() {
        return Student.remove();
    }
};
