import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

//mui
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

//icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

//redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

const Notifications = () => {
    const [anchorEl] = useState(null);
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);


