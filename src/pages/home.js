import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

//components
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';

//redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

const Home = (props) => {
    const { screams, loading } = props.data;

    useEffect(() => {
        props.getScreams();
    }, []);

    let recentScreamsMarkup = !loading ?
        (screams.map((scream) => (<Scream key={scream.screamId} scream={scream} />)))
        :
        (<p>Loading. . . </p>);

    return (

        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    )
}

Home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getScreams })(Home);