import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

//components
import MyButton from '../Button';

//mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

//icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

//redux
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

const PostScream = (props) => {
    const [open, setOpen] = useState(false);
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {

        if(props.UI.errors) {
            setErrors(props.UI.errors);
        }
        if(!props.UI.errors) {
            setBody('');
            handleClose();
        }

    }, [props.data.screams, props.UI.errors]);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        props.clearErrors();
        setOpen(false);
        setErrors({});
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.postScream({ body: body });

    }
    const handleChange = e => {
        setBody(e.target.value)
    }

    const { UI: { loading } } = props;

    return(
        <Fragment>
            <MyButton onClick={handleOpen} tip="Post a Scream!">
                <AddIcon/>
            </MyButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                className="post"
            >
                <MyButton tip="Close" onClick={handleClose} tipClassName="post-close">
                    <CloseIcon/>
                </MyButton>
                <DialogTitle>Post a new scream</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="Scream"
                            multiline
                            rows="3"
                            placeholder="Scream at your plants friends"
                            error={errors?.body ? true : false}
                            helperText={errors?.body}
                            className="post-textfield"
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className="post-submit" 
                            disabled={loading}
                        >
                            Submit
                            {loading && (
                                <CircularProgress size={30} className="post-progress"/>
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
})

export default connect(mapStateToProps, { postScream, clearErrors })(PostScream);