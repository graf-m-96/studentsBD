import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
});

function SnackbarStatus(props) {
    const {
        classes,
        isOpen,
        onClose,
        variant,
        message
    } = props;
    const Icon = variantIcon[variant];

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isOpen}
            autoHideDuration={3000}
            onClose={onClose}
        >
            <SnackbarContent
                className={classes[variant]}
                message={
                    <span className={classes.message}>
                        <Icon className={classNames(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
}

SnackbarStatus.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
    message: PropTypes.string.isRequired
};

export default withStyles(styles1)(SnackbarStatus);
