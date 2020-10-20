import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//import axios from 'axios';

import AppIcon from '../images/green-plant.svg';

import { Link } from 'react-router-dom';

//material ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


//redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});


const Login = (props) => {
    const { register, handleSubmit } = useForm();
    const { UI: { loading } } = props;

    const [form, setForm] = useState({
        email:'',
        password: ''
    });

    const [errors, setErrors] = useState({});




    useEffect(() => {
        setErrors(props.UI.errors);
    }, [props.UI.errors]);

    const onSubmit = (event) => {
        //event.preventDefault();

        const userData = {
            email: form.email,
            password: form.password
        }

        props.loginUser(userData, props.history);
    }

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <Grid container className="login-form">
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="Social Plant" />
                    <Typography variant="h2" className="login-title">Login</Typography>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className="login-textfield"
                            helperText={errors?.email}
                            error={errors?.email ? true : false}
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            ref={register({ required: true })}
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className="login-textfield"
                            helperText={errors?.password}
                            error={errors?.password ? true : false}
                            value={form.password}
                            onChange={handleChange}
                            fullWidth
                            ref={register({ required: true })}
                        />
                        {errors?.general && (
                            <Typography variant="body2" className="login-error">
                                {errors?.general}
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
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));