import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Form from './form';
import StructureDescription from './structureDescription';
import SnackbarStatus from '../snackbarStatus';

const styles = theme => ({
    root: {
        margin: '40px 80px 0',
        fontFamily: theme.typography.fontFamily,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
});

class Creator extends React.Component {
    state = {
        openedSnackbar: null
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

    render() {
        const {
            classes,
            appendStudent,
            formType,
            modifiableStudent,
            changeToCreateForm,
            editStudent
        } = this.props;

        return (
            <div className={classes.root}>
                <StructureDescription/>
                <Form
                    changeSnackbar={this.changeSnackbar}
                    appendStudent={appendStudent}
                    formType={formType}
                    modifiableStudent={modifiableStudent}
                    changeToCreateForm={changeToCreateForm}
                    editStudent={editStudent}
                />
                <SnackbarStatus
                    isOpen={this.state.openedSnackbar === 'create'}
                    onClose={this.closeSnackbar}
                    variant="success"
                    message="Пользователь был успешно создан"
                />
                <SnackbarStatus
                    isOpen={this.state.openedSnackbar === 'edit'}
                    onClose={this.closeSnackbar}
                    variant="success"
                    message="Пользователь был успешно изменён"
                />
                <SnackbarStatus
                    isOpen={this.state.openedSnackbar === 'error'}
                    onClose={this.closeSnackbar}
                    variant="error"
                    message="Нет соединения с сервером, попробуйте попозже"
                />
            </div>
        );
    }
}

Creator.propTypes = {
    appendStudent: PropTypes.func.isRequired,
    formType: PropTypes.oneOf(['create', 'edit']).isRequired,
    modifiableStudent: PropTypes.any,
    changeToCreateForm: PropTypes.func.isRequired,
    editStudent: PropTypes.func.isRequired
};

export default withStyles(styles)(Creator);
