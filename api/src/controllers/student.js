'use strict';

const errorMessages = require('../errors/errorMessages');
const ServerError = require('../errors/serverError').ServerError;
const StudentManager = require('../managers/student').StudentManager;

exports.create = async (req, res, next) => {
    const student = await StudentManager.create(req.body);
    if (!student) {
        next(new ServerError(errorMessages.INVALID_INPUT_PARAMETERS, 400));
    }
    res.status(201).send(student);
};

exports.get = async (req, res, next) => {
    const student = await StudentManager.getById(req.params.id);
    if (!student) {
        return next(new ServerError(errorMessages.STUDENT_NOT_FOUND, 400));
    }
    res.status(200).send(student);
};

exports.getAll = async (req, res) => {
    const students = await StudentManager.getAll();
    res.status(200).send(students);
};

exports.edit = async (req, res, next) => {
    const student = await StudentManager.editById(req.params.id, req.body);
    if (!student) {
        return next(new ServerError(errorMessages.STUDENT_NOT_FOUND, 400));
    }
    res.status(200).send(student);
};

exports.delete = async (req, res, next) => {
    const result = await StudentManager.deleteById(req.params.id);
    if (!result) {
        return next(new ServerError(errorMessages.STUDENT_NOT_FOUND, 400));
    }
    res.sendStatus(200);
};

exports.clear = async (req, res) => {
    await StudentManager.deleteAll();
    res.sendStatus(200);
};
