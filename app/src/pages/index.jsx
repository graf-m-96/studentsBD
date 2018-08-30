import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Creator from '../components/creator';
import StudentsList from '../components/studentsList';
import Spinner from '../components/spinner';
import SnackbarStatus from '../components/snackbarStatus';
import ApiManager from '../lib/requests';


const styles = theme => ({
    root: {
        flex: 1,
        backgroundColor: theme.palette.background.lightGrey,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            students: null,
            openedSnackbar: null,
            formType: 'create',
            modifiableStudent: null
        };
        this.loadData();
    }

    loadData() {
        ApiManager.getStudents()
            .then(students => this.setState({ students }))
            .catch(() => this.changeSnackbar('error'));
    }

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openedSnackbar: null });
    };

    changeSnackbar = snackbarName => {
        this.setState({ openedSnackbar: snackbarName });
    };

    changeToEditForm = id => {
        this.setState({
            formType: 'edit',
            modifiableStudent: this.state.students.find(student => student._id === id)
        });
    };

    changeToCreateForm = () => {
        this.setState({
            formType: 'create',
            modifiableStudent: null
        });
    };

    appendStudent = student => {
        this.setState({ students: [...this.state.students, student] });
    };

    updateStudents = students => {
        this.setState({ students });
    };

    editStudent = editedStudent => {
        const students = this.state.students.map(student => {
            return student._id === editedStudent._id ? editedStudent : student;
        });
        this.setState({ students });
    };

    changeTab = (event, value) => {
        if (value === 0) {
            this.changeToCreateForm();
        }
        this.setState({ tabValue: value });
    };

    render() {
        const { tabValue } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={tabValue} onChange={this.changeTab}>
                        <Tab label="База данных" />
                        <Tab label="Создать нового пользователя" />
                    </Tabs>
                </AppBar>
                {tabValue === 0 &&
                (this.state.students ?
                        <StudentsList
                            students={this.state.students}
                            updateStudents={this.updateStudents}
                            changeTab={this.changeTab}
                            changeToEditForm={this.changeToEditForm}
                        />
                        : <Spinner />
                )
                }
                {tabValue === 1 &&
                <Creator
                    appendStudent={this.appendStudent}
                    formType={this.state.formType}
                    modifiableStudent={this.state.modifiableStudent}
                    changeToCreateForm={this.changeToCreateForm}
                    editStudent={this.editStudent}
                />
                }
                <SnackbarStatus
                    isOpen={this.state.openedSnackbar === 'error'}
                    onClose={this.closeSnackbar}
                    variant="error"
                    message="Нет соединения с сервером, попробуйте попозже перезагрузрить страницу"
                />
            </div>
        );
    }
}

export default withStyles(styles)(App);
