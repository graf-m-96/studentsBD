import ReactLoading from 'react-loading';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        zIndex: -1,
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

function Spinner(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <ReactLoading
                type="spinningBubbles"
                color="#3f50b5"
                height={'20%'}
                width={'20%'}
            />
        </div>
    );
}

export default withStyles(styles)(Spinner);
