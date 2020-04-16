import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

    // console.log(props.ingredients)
    const ingredients = Object.keys(props.ingredients).map(item => {
        return <span 
        style={{textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
        }}
        key={item}>{item + " (" + props.ingredients[item] + ") "}
        </span>;
    })
    // console.log(ingredients);
    return(
        <div className={classes.Order}>
            <p>Ingredients : {ingredients}</p>
            <p>Price : <strong>USD {props.price}</strong></p>
        </div>
    );
};

export default order;