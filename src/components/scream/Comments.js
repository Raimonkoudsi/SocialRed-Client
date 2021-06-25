import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Comments = ({comments = []}) => {
    //const { comments } = props;

    return(
        <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAd, userImage, userHandle } = comment;

                return(
                    <Fragment key={createdAd}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt="comment" className="comment-image" />
                                </Grid>
                                <Grid item sm={9}>
                                    <div className="comment-data">
                                        <Typography
                                            variant="h5"
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color="primary"
                                        >
                                            {userHandle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(createdAd).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className="separator"/>
                                        <Typography variant="body1">
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* last index */}
                        {index !== comments.length -1 && (
                            <hr className="separator-visible" />
                        )}
                        
                    </Fragment>
                )
            })}
        </Grid>

    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default Comments;