import React from 'react';
import { AppBar, Typography } from '@material-ui/core';

import useStyles from './styles';
import header from '../../images/header.png';

const Navbar = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" align="center">Check Out My Pet!</Typography>
            <img className={classes.image} src={header} alt="header" height="60" />
        </AppBar>
    )
}

export default Navbar
