import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    //To iterate objects, first make array of all the keys and
    //then using each element in the array, access value of each key
    //using the "map()" function in both cases to iterate.
    let separatedItems = Object.keys(props.ingredients).map((ingKey) => {
        return [...Array(props.ingredients[ingKey])].map((_, index) => {
            return <BurgerIngredient key={ingKey + index} type={ingKey} />
        });
    })

    const igCount = separatedItems.reduce((acc, current) =>{
        return acc + current.length;
    }, 0);

    if (igCount === 0) {
        separatedItems = <p>Please add ingredients</p>;
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {separatedItems}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;