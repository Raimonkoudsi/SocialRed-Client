import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//mui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const CommentForm = (props) => {

    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {

        if(props.UI.errors) {
            setErrors(props.UI.errors);
        }
        if(!props.UI.errors && !props.UI.loading) {
            setBody('');
        }

    }, [props.UI.errors]);

    const handleChange = (event) => {
        setBody(event.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        props.submitComment(props.screamId, { body: body });
    }

    const { authenticated } = props;

    const commentFormMarkup = authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                <TextField 
                    name="body"
                    type="text"
                    label="Comment on scream"
                    error={errors?.comment ? true : false}
                    helperText={errors?.comment}
                    value={body}
                    onChange={handleChange}
                    fullWidth
                    className="comment-textfield"
                />
                <Button 
                    type="submit" 
                    variant="contained"
                    color="primary"
                    className="comment-button"
                >
                    Submit
                </Button>
            </form>
            <hr className="separator-visible"/>
        </Grid>

    ) : null;

    return commentFormMarkup;
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(CommentForm);