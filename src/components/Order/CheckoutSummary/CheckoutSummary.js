import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    
    let burgercomponent = null;
    if (props.ingredients === null) {
        //do nothing
    } else {
        burgercomponent = <Burger ingredients={props.ingredients} />;
    }

    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width: '100%', height: '300px', margin: 'auto'}}>
                {burgercomponent}
            </div>
            <div className={classes.Buttons}>
                <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    );
}

export default checkoutSummary;