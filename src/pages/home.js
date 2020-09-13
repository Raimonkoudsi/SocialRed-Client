import React, { useEffect } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

const home = () => {

    useEffect(() => {
        axios.get('/screams')
            .then(res => {

            })
    }, [])


    return (
        <Grid container spacing={16}>
            <Grid item sm={8} xs={12}>
                content...
            </Grid>
            <Grid item sm={4} xs={12}>
                profile...
            </Grid>
        </Grid>
    )
}

export default home;