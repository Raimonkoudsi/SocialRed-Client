import React, { useState } from "react";

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import AppIcon from '../images/green-plant.svg';

import axios from 'axios';

import { Link } from 'react-router-dom';

//material ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';



const styles = (theme) => ({
    ...theme.spreadThis
});


const Signup = (props) => {

    const { classes } = props;

    const [form, setForm] = useState({
        email:'',
        password: '',
        confirmPassword: '',
        handle: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

  

        const newUserData = {
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
            handle: form.handle
        }
        setLoading(true);

        axios.post('/signup', newUserData)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("#BIdToken", `Bearer ${res.data.token}`);
                setLoading(false);
                props.history.push('/');
            })
            .catch((err) => {
                if(form.password.length<=5) {
                    errors.password= 'The password must be at least 6 characters';
                } else {
                    setErrors(err.response.data);
                }
                setLoading(false);
            });
    }

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }


    return (
        <div>
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="Social Plant" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>Signup</Typography>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={form.email}
                            onChange={changeHandler}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={form.password}
                            onChange={changeHandler}
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={form.confirmPassword}
                            onChange={changeHandler}
                            fullWidth
                        />
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="Handle"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={form.handle}
                            onChange={changeHandler}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >
                            Signup
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br /><br />
                        <small>Already have an account ? <Link to="/signup" className="green-color">click here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        </div>
    )
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup);