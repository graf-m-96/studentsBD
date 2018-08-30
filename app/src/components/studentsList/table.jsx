import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CreateIcon from '@material-ui/icons/AddCircleOutline';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const rows = [
    'Фамилия',
    'Имя',
    'Рейтинг',
];

class EnhancedTableHead extends React.Component {
    render() {
        const {
            onSelectAllClick,
            numberSelected,
            studentsCount
        } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numberSelected > 0}
                            checked={studentsCount === numberSelected && studentsCount !== 0}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map((rowName, index) => {
                        return (
                            <TableCell key={index}>
                                {rowName}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numberSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    studentsCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
    root: {
        justifyContent: 'flex-end'
    },
    highlight: {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    },
    title: {
        margin: 'auto'
    },
    selected: {
        marginRight: 'auto'
    }
});

let EnhancedTableToolbar = props => {
    const {
        classes,
        numberSelected,
        deleteStudents,
        selected,
        cancelSelected,
        changeTab,
        changeToEditForm
    } = props;

    return (
        <Toolbar className={classNames(classes.root, {[classes.highlight]: numberSelected > 0,})}>
            {numberSelected > 0 ? (
                <Typography className={classes.selected} color="inherit" variant="subheading">
                    {`${numberSelected} ${numberSelected === 1 ? "выбран" : "выбрано"}`}
                </Typography>
            ) : (
                <Typography className={classes.title} variant="title">
                    Студенты
                </Typography>
            )}
            {numberSelected === 1 && (
                <Tooltip title="Изменить">
                    <IconButton>
                        <EditIcon
                            onClick={() => {
                                changeTab(null, 1);
                                changeToEditForm(selected[0]);
                            }}
                        />
                    </IconButton>
                </Tooltip>
            )}
            {numberSelected > 0 && (
                <Tooltip title="Удалить">
                    <IconButton
                        onClick={() => {
                            deleteStudents(selected);
                            cancelSelected();
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
            <Tooltip title="Создать">
                <IconButton
                    onClick={() => changeTab(null, 1)}
                >
                    <CreateIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numberSelected: PropTypes.number.isRequired,
    deleteStudents: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
    cancelSelected: PropTypes.func.isRequired,
    changeTab: PropTypes.func.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '94%',
        margin: '50px 3%'
    },
    tableCell__long : {
        width: '40%'
    },
    tableCell__short: {
        width: '10%'
    }
});

class EnhancedTable extends React.Component {
    state = {
        selected: []
    };

    cancelSelected = () => {
        this.setState({ selected: [] });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({ selected: this.props.students.map(student => student._id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {
            classes,
            students,
            deleteStudents,
            changeTab,
            changeToEditForm
        } = this.props;
        const { selected } = this.state;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar
                    numberSelected={selected.length}
                    deleteStudents={deleteStudents}
                    selected={selected}
                    cancelSelected={this.cancelSelected}
                    changeTab={changeTab}
                    changeToEditForm={changeToEditForm}
                />
                <Table>
                    <EnhancedTableHead
                        numberSelected={selected.length}
                        onSelectAllClick={this.handleSelectAllClick}
                        studentsCount={students.length}
                    />
                    <TableBody>
                        {students
                            .map(student => {
                                const isSelected = this.isSelected(student._id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => this.handleClick(event, student._id)}
                                        key={student._id}
                                        selected={isSelected}
                                    >
                                        <TableCell className={classes.tableCell__short} padding="checkbox">
                                            <Checkbox checked={isSelected}/>
                                        </TableCell>
                                        <TableCell className={classes.tableCell__long}>
                                            {student.name}
                                        </TableCell>
                                        <TableCell className={classes.tableCell__long}>
                                            {student.surname}
                                        </TableCell>
                                        <TableCell className={classes.tableCell__short}>
                                            {student.rating}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteStudents: PropTypes.func.isRequired,
    changeTab: PropTypes.func.isRequired,
    changeToEditForm: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnhancedTable);
