import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//components
import MyButton from '../Button';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

//mui
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';


const ScreamDialog = (props) => {
    const [open, setOpen] = useState(false);

    const [oldPath, setOldPath] = useState('');
    const [newPath, setNewPath] = useState('');

    useEffect(() => {
        if(props.openDialog) {
            handleOpen();
        }
    }, [])

    const handleOpen = () => {

        let oldPath = window.location.pathname;

        const { userHandle, screamId } = props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;

        if(oldPath === newPath) oldPath = `/users/${userHandle}`;
        
        window.history.pushState(null, null, newPath);

        setOpen(true);
        setOldPath(oldPath);
        setNewPath(newPath);

        props.getScream(props.screamId);
    };
    const handleClose = () => {

        console.log(oldPath);
        console.log(newPath);

        if(newPath===oldPath)
            oldPath = `/users/${userHandle}`;
        
        window.history.pushState(null, null, oldPath);

        setOpen(false);

        props.clearErrors();
    };

    const {scream: { screamId, body, createdAd, likeCount, commentCount, userImage, userHandle, comments}, UI: { loading }} = props;

    const dialogMarkup = loading ? (
        <div className="spinner">
            <CircularProgress size={200} thickness={2} />
        </div>
    ) : (
        <Grid container spacing={16}>
            <Grid item sm={5}>
                <img src={userImage} alt="Profile" className="scream-image"/>
            </Grid>
            <Grid item sm={7}>
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${userHandle}`}
                >
                    @{userHandle}
                </Typography>
                <hr className="separator"/>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAd).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className="separator"/>
                <Typography variant="body1">
                    {body}
                </Typography>
                <LikeButton screamId={screamId}/>
                <span>{likeCount} likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                <span>{commentCount} comments</span>
            </Grid>
            <hr className="separator-visible"/>
            <CommentForm screamId={screamId}/>
            <Comments comments={comments}/>
        </Grid>
    )

    return(
        <Fragment>
            <MyButton onClick={handleOpen} tip="Expand Scream" tipClassName="scream-expand">
                <UnfoldMore color="primary"/>
            </MyButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                className="scream"
            >
                <MyButton
                    tip="Close"
                    onClick={handleClose}
                    tipClassName="scream-close"
                >
                    <CloseIcon/>
                </MyButton>

                <DialogContent className="scream-content">
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </Fragment>
    )

};

ScreamDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getScream:PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(ScreamDialog);