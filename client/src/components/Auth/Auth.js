import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import { GoogleLogin } from '@react-oauth/google';
// import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

import useStyles from './styles';
import Input from './Input';
// import Icon from './icon';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }

        console.log(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    // const googleSuccess = async (credentialResponse) => {
    //     const token = credentialResponse?.credential;
    //     const tokenDecoded = decode(token);
    //     // console.log(tokenDecoded);

    //     const result = { name: tokenDecoded.name, email: tokenDecoded.email, imageUrl: tokenDecoded.picture, googleId: tokenDecoded.sub };
    //     // console.log(authData);

    //     try {
    //         dispatch({ type: 'AUTH', data: { result, token } });

    //         history.push('/'); // redirect to home page
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // const googleError = () => {
    //     console.log("Google Sign In was unsuccessful. Try Again Later");
    // };

    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => console.log(tokenResponse),
    // });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <div id='signInDiv'></div>
                    {/* <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={googleError}
                    /> */}
                    {/* <Button className={classes.googleButton} color="primary" fullWidth onClick={() =>  login()} startIcon={<Icon />} variant="contained">
                        Google Sign In
                    </Button> */}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
