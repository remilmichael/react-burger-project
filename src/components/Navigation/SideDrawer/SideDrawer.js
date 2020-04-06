import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigatinItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer];
    if(props.open) {
        attachedClasses.push(classes.Open);
    } else {
        attachedClasses.push(classes.Close);
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <div className={classes.CloseBtn} onClick={props.closeBtnClk}>
                    <div className={classes.BackSlash}></div>
                    <div className={classes.ForwardSlash}></div>
                </div>
                <nav>
                    <NavigationItems />
                </nav>                
            </div>
        </Aux>
    );
};
 
export default sideDrawer;