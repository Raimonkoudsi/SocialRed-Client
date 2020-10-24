import React, { Fragment, useState } from 'react';


import PropTypes from 'prop-types';

//components
import MyButton from '../Button';

//mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

//icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//redux
import { connect } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions';


const DeleteScream = (props) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteScream = () => {
        props.deleteScream(props.screamId);
        setOpen(false);
    };

    return(
        <Fragment>
            <MyButton tip="Delete scream"
                onClick={handleOpen}
                btnClassName="delete-button"
            >
                <DeleteOutline color="secondary" />
            </MyButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to delete this scream ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteScream} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, { deleteScream })(DeleteScream);