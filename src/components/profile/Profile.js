import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//components
import EditDetails from './EditDetails';
import MyButton from '../Button';

//mui
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from'@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

//redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const Profile = (props) => {
    const {user: {credentials: { handle, createdAd, imageUrl, bio, website, location }, loading, authenticated }} = props;
    
    const handleImageChange = (event) => {
        
        const image = event.target.files[0];
    
        //enviar al server
        const formData = new FormData();
        formData.append('image', image, image.name);
    
        props.uploadImage(formData);
        
    }
    
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click(); 
    }

    const handleLogout = () => {
        props.logoutUser();
    }

    let profileMarkup = !loading ? (authenticated ? (
        <Paper className="paper">
            <div className="profile">
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                    <input type="file" hidden="hidden" id="imageInput" onChange={handleImageChange} />
                    <MyButton tip="Edit profile picture" onClick={handleEditPicture} btnClassName="button">
                        <EditIcon color="primary"/>
                    </MyButton>
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <Fragment>
                            <LocationOn color="primary" /> <span>{location}</span>
                            <hr/>
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}{website}
                            </a>
                            <hr/>
                        </Fragment>
                    )}
                    <CalendarToday color="primary"/>{' '}
                    <span>Joined {dayjs(createdAd).format('MMM YYYY')}</span>
                </div>
                <MyButton tip="Logout" onClick={handleLogout}>
                    <KeyboardReturn color="primary"/>
                </MyButton>
                <EditDetails/>
            </div>
        </Paper>
    ) : (
        <Paper className="paper">
            <Typography variant="body2" align="center">
                No profile, please login again
            </Typography>
            <div className="buttons">
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Login
                </Button>
                <Button variant="contained" color="secondary" component={Link} to="/signup">
                    Signup
                </Button>
            </div>
        </Paper>
    )) : (<p>...loading</p>);

    return profileMarkup;
};

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Profile);