import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

//components
import MyButton from '../Button';
import PostScream from '../scream/PostScream';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//material ui
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';

//icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

const Navbar = (props) => {
    const { authenticated } = props;

    return (
        <AppBar>
            <ToolBar className="nav-container">
                {authenticated ? (
                    <Fragment>
                        <PostScream/>
                        <Link to="/">
                            <MyButton tip="Home">
                                <HomeIcon/>
                            </MyButton>
                        </Link>
                        <MyButton tip="Notifications">
                            <Notifications/>
                        </MyButton>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </Fragment>
                )}
            </ToolBar>
        </AppBar>
    );
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);