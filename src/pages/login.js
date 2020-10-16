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
//import { formats } from "dayjs/locale/*";



const styles = (theme) => ({
    ...theme.spreadThis
});


const Login = (props) => {

    const { classes } = props;

    const [form, setForm] = useState({
        email:'',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            email: form.email,
            password: form.password
        }
        setLoading(true);

        axios.post('/login', userData)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("#BIdToken", `Bearer ${res.data.token}`);
                setLoading(false);
                props.history.push('/');
            })
            .catch((err) => {
                setErrors(err.response.data);
                setLoading(false);
            });
    }

    return (
        <div>
            <Grid container className="login-form">
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="Social Plant" />
                    <Typography variant="h2" className="login-title">Login</Typography>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="email"
                            className="login-textfield"
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
                            label="password"
                            className="login-textfield"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={form.password}
                            onChange={changeHandler}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className="login-error">
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="login-button"
                            disabled={loading}
                        >
                            Login
                            {loading && (
                                <CircularProgress size={30} className="login-progress" />
                            )}
                        </Button>
                        <br /><br />
                        <small>dont have an account ? sign up <Link to="/signup" className="green-color">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        </div>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);