import React from 'react';

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

//components
import MyButton from '../Button';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

//Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//icons
import ChatIcon from '@material-ui/icons/Chat';

//redux
import { connect } from 'react-redux';

const Scream = (props) => {


    dayjs.extend(relativeTime);

    //datos de la bd
    const { scream: { body, createdAd, userImage, userHandle, screamId, likeCount, commentCount }, user: { authenticated, credentials: { handle } } } = props;

    const deleteButton = authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
    ) : null;

    return (
        <Card className="card-scream">
            <CardMedia
                image={userImage}
                title="Profile Image"
                className="image"
            />
            <CardContent className="content">
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary" title={dayjs(createdAd).format('YYYY-MM-DD HH:mm:ss')}>{dayjs(createdAd).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                <LikeButton screamId={screamId}/>
                <span>{likeCount} Likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                <span>{commentCount} comments</span>
                <ScreamDialog screamId={screamId} userHandle={userHandle} />
            </CardContent>
        </Card>
    )
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});


export default connect(mapStateToProps)(Scream);