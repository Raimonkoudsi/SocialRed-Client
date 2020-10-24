import React, { Fragment, useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';

//components
import MyButton from '../Button';

//redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

//mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

//icons
import EditIcon from '@material-ui/icons/Edit';

const EditDetails = (props) => {

    const [form, setForm] = useState({
        bio:'',
        website: '',
        location: '',
        open: false
    });

    const mapUserDetailsToState = useCallback((credentials, open) => {
        setForm({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
            open: open
        });
    }, []);

    useEffect(() => {
        const { credentials } = props;
        mapUserDetailsToState(credentials);
    }, []);

    const handleOpen = () => {
        mapUserDetailsToState(props.credentials, true);
    }
    const handleClose = () => {
        setForm({
            open: false
        });
    }
    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onSubmit = () => {
        const userDetails = {
            bio: form.bio,
            website: form.website,
            location: form.location
        };

        props.editUserDetails(userDetails);
        handleClose();
    }

    return(
        <Fragment>
            <MyButton tip="Edit details" onClick={handleOpen} btnClassName="button-details">
                <EditIcon color="primary"/>
            </MyButton>
            <Dialog
                open={form.open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent>
                    <form>
                        <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A bio about yourself"
                            className="textfield"
                            value={form.bio}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Your website"
                            className="textfield"
                            value={form.website}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Where you live"
                            className="textfield"
                            value={form.location}
                            onChange={handleChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(EditDetails);