import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigatinItems/NavigationItems';
import Toggler from '../DrawerToggler/DrawerToggler';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Toggler toggler={props.toggler} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;