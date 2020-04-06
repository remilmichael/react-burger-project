import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price : <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map((ctrl) => (
              <BuildControl 
                key={ctrl.label}
                label={ctrl.label} 
                added={() => props.ingAdded(ctrl.type)}
                removed={() => props.ingRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
              />  
            ))
        }
        <div className={classes.Buttons}>
          <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.reset}>CLEAR</button>
          
          <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.purchase}>ORDER NOW</button>
        </div>
    </div>
);

export default buildControls;