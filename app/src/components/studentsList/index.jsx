import React from 'react';
import PropTypes from 'prop-types';

import Table from './table';
import SnackbarStatus from '../../components/snackbarStatus';
import ApiManager from '../../lib/requests';

class StudentsList extends React.Component {
    state = {
        openedSnackbar: null,
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openedSnackbar: null });
    };

    changeSnackbar = snackbarName => {
        this.setState({ openedSnackbar: snackbarName });
    };

    deleteStudents = selected => {
        const {
            students,
            updateStudents
        } = this.props;

        if (students.length === selected.length) {
            ApiManager.deleteStudents()
                .then(() => updateStudents([]))
                .then(() => this.changeSnackbar('success'))
                .catch(() => this.changeSnackbar('error'));
        } else {
            Promise.all(selected.map(id => ApiManager.deleteStudent(id)))
                .then(() => {
                    selected = new Set(selected);
                    const newStudents = students.filter(student => !selected.has(student._id));
                    updateStudents(newStudents);
                })
                .then(() => this.changeSnackbar('success'))
                .catch(() => this.changeSnackbar('error'));
        }
    };

    render() {
        return (
            <>
                <Table
                    students={this.props.students}
                    deleteStudents={this.deleteStudents}
                    changeTab={this.props.changeTab}
                    changeToEditForm={this.props.changeToEditForm}
                />
                <SnackbarStatus
                    isOpen={this.state.openedSnackbar === 'success'}
                    onClose={this.closeSnackbar}
                    variant="success"
                    message="Удаление прошло успешно"
                />
                <SnackbarStatus
                    isOpen={this.state.openedSnackbar === 'error'}
                    onClose={this.closeSnackbar}
                    variant="error"
                    message="Нет соединения с сервером, попробуйте попозже"
                />
            </>
        );
    }
}

StudentsList.propTypes = {
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateStudents: PropTypes.func.isRequired,
    changeTab: PropTypes.func.isRequired,
    changeToEditForm: PropTypes.func.isRequired
};

export default StudentsList;
