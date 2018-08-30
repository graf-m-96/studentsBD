/* eslint-disable camelcase */
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        margin: '40px 80px 0',
        fontFamily: theme.typography.fontFamily,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    structureDescription: {
        minWidth: '348px',
        marginRight: '100px'
    },
    structureDescription__title: {
        marginBottom: '25px'
    },
    structureDescription__item: {
        marginBottom: '10px'
    },
    structureDescription__keywords: {
        fontStyle: 'italic',
        fontWeight: 500
    },
    formType: {
        minWidth: '242px'
    },
    title: {
        textAlign: 'center'
    }
});

class StructureDescription extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.structureDescription}>
                <h3 className={classNames(classes.title, classes.structureDescription__title)}>
                    Структура студент
                </h3>
                <ul>
                    <li className={classes.structureDescription__item}>
                        <span className={classes.structureDescription__keywords}>Имя </span>
                        (непустая строка)
                    </li>
                    <li className={classes.structureDescription__item}>
                        <span className={classes.structureDescription__keywords}>Фамилия </span>
                        (непустая строка)
                    </li>
                    <li className={classes.structureDescription__item}>
                        <span className={classes.structureDescription__keywords}>Рейтинг </span>
                        (целое, неотрицательное число, не превосходящее 100)
                    </li>
                </ul>
            </div>
        );
    }
}

export default withStyles(styles)(StructureDescription);
