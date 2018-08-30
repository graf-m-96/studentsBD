'use strict';

const StudentController = require('./controllers/student');

module.exports = app => {
    app.post('/places', StudentController.create);

    app.get('/places', StudentController.getAll);

    app.get('/places/:id', StudentController.get);

    app.put('/places/edit/:id', StudentController.edit);

    app.delete('/places', StudentController.clear);

    app.delete('/places/:id', StudentController.delete);
};
