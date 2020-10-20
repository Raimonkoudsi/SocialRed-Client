import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

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
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});


const Signup = (props) => {
    const { register, handleSubmit } = useForm();

    const { classes } = props;
    const { UI: { loading } } = props;

    const [form, setForm] = useState({
        email:'',
        password: '',
        confirmPassword: '',
        handle: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(props.UI.errors);
    }, [props.UI.errors]);


    const onSubmit = (event) => {
        //event.preventDefault();

        const newUserData = {
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
            handle: form.handle
        }

        props.signupUser(newUserData, props.history);
    }

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }


    return (
        <div>
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="Social Plant" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>Signup</Typography>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
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
                            className={classes.textField}
                            helperText={errors?.password}
                            error={errors?.password ? true : false}
                            value={form.password}
                            onChange={handleChange}
                            fullWidth
                            ref={register({ required: true })}
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            helperText={errors?.confirmPassword}
                            error={errors?.confirmPassword ? true : false}
                            value={form.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                            ref={register({ required: true })}
                        />
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="Handle"
                            className={classes.textField}
                            helperText={errors?.handle}
                            error={errors?.handle ? true : false}
                            value={form.handle}
                            onChange={handleChange}
                            fullWidth
                            ref={register({ required: true })}
                        />
                        {errors?.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors?.general}
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
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup));