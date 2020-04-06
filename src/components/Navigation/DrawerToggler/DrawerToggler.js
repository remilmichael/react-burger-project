import React from 'react';
import classes from './DrawerToggler.module.css';

const toggler = (props) => (
    <div onClick={props.toggler} className={classes.DrawerToggler}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default toggler;