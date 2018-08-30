import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconCancel from '@material-ui/icons/Clear';
import IconAdd from '@material-ui/icons/AddCircle';

import ApiManager from '../../lib/requests';

const styles = theme => ({
    formType: {
        minWidth: '242px'
    },
    form__textField: {
        display: 'block'
    },
    form__background: {
        boxSizing: 'padding-box',
        padding: '5px 25px 25px',
        width: '242px'
    },
    form__buttons: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'center'
    }
});

class Form extends React.Component {
    submitToApi = async event => {
        const {
            changeSnackbar,
            formType,
            modifiableStudent,
            changeToCreateForm,
            appendStudent,
            editStudent
        } =  this.props;
        event.preventDefault();
        const formData = this.readDataFromForm(event);
        if (formType === 'create') {
            ApiManager.createStudent(formData)
                .then(appendStudent)
                .then(() => changeSnackbar('create'))
                .catch(() => changeSnackbar('error'));
        } else {
            ApiManager.editStudent(modifiableStudent._id, formData)
                .then(editStudent)
                .then(() => {
                    changeSnackbar('edit');
                    changeToCreateForm();
                })
                .catch(() => changeSnackbar('error'));

        }
    };

    readDataFromForm = event => {
        const formData = new FormData(event.target);
        const inputNames = ['name', 'surname', 'rating'];

        return inputNames.reduce((data, inputName) => {
            data[inputName] = formData.get(inputName);

            return data;
        }, {});
    };

    render() {
        const {
            classes,
            formType,
            modifiableStudent
        } = this.props;

        return (
            <div className={classes.form}>
                <h3 className={classes.title}>
                    {formType === 'create' ? "Регистрация" : "Редактирование"}
                </h3>
                <Paper elevation={10} className={classes.form__background}>
                    <form onSubmit={this.submitToApi}>
                        <TextField
                            required
                            fullWidth
                            label="Имя"
                            name="name"
                            className={classes.form__textField}
                            margin="normal"
                            inputProps={{
                                autoComplete: 'off',
                                maxLength: '25'
                            }}
                            defaultValue={formType === 'create' ? '' : modifiableStudent.name}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Фамилия"
                            name="surname"
                            className={classes.form__textField}
                            margin="normal"
                            inputProps={{
                                autoComplete: 'off',
                                maxLength: '25'
                            }}
                            defaultValue={formType === 'create' ? '' : modifiableStudent.surname}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Рейтинг"
                            name="rating"
                            className={classes.form__textField}
                            margin="normal"
                            type="number"
                            inputProps={{
                                autoComplete: 'off',
                                min: '0',
                                max: '100'
                            }}
                            defaultValue={formType === 'create' ? '' : modifiableStudent.rating}
                        />
                        <div className={classes.form__buttons}>
                            <Tooltip title={formType === 'create' ? 'Создать' : 'Изменить'}>
                                <Button type="submit" variant="contained">
                                    <IconAdd/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Очистить">
                                <Button type="reset" variant="contained">
                                    <IconCancel/>
                                </Button>
                            </Tooltip>
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
}

Form.propTypes = {
    changeSnackbar: PropTypes.func.isRequired,
    appendStudent: PropTypes.func.isRequired,
    formType: PropTypes.oneOf(['create', 'edit']).isRequired,
    modifiableStudent: PropTypes.any,
    changeToCreateForm: PropTypes.func.isRequired
};

export default withStyles(styles)(Form);
