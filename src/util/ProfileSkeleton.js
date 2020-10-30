import React from 'react';

import PropTypes from 'prop-types';
import NoImg from '../images/NoImg.png';

//mui
import Paper from '@material-ui/core/Paper';

//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';


const ProfileSkeleton = (props) => {

    return(
        <Paper className="paper">
            <div className="profile">
                <div className="image-wrapper">
                    <img src={NoImg} alt="profile" className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <div className="handle"/>
                    <hr/>
                    <div className="full-line"/>
                    <div className="full-line"/>
                    <hr/>
                    <LocationOn color="primary"/> <span>Location</span>
                    <hr/>
                    <LinkIcon color="primary"/> https://website.com
                    <hr/>
                    <CalendarToday color="primary"/> Joined date
                </div>
            </div>
        </Paper>
    )
}

export default ProfileSkeleton;