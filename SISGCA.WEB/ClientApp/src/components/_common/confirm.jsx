import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Confirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabledButtons: false
        };
    }

    enableButtons() {
        const { disabledButtons } = this.state;
        if (disabledButtons) {
            this.setState({ disabledButtons: false });
        }
    }

    disableButtons() {
        this.setState({ disabledButtons: true });
    }

    handleClose = () => {
        this.props.onClose();
    };

    handleConfirm = () => {
        this.disableButtons();
        this.props.onConfirm();
        this.props.onClose();
    }

    handleOpen = () => {
        this.enableButtons();
    }

    render() {
        const { disabledButtons } = this.state;
        const { okText, cancelText, children, open } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    onEnter={this.handleOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="confirm"
                    aria-describedby="confirm dialog"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Confirmar"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {children}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} disabled={disabledButtons}>
                            {cancelText || 'Cancelar'}
                        </Button>
                        <Button onClick={this.handleConfirm} disabled={disabledButtons} color="primary">
                            {okText || 'Ok'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Confirm.propTypes = {
    children: PropTypes.string.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default Confirm;
