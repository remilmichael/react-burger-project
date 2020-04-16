import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.inputtype) {
        case ('input'):
            inputElement = <input 
            className={inputClasses.join(' ')} 
            type="input" name={props.name} 
            placeholder={props.elementConfig.placeholder} 
            value={props.elementConfig.value} 
            onChange={props.changed}       
            />;
            break;
        case ('textarea'):
            inputElement = <textarea 
            className={inputClasses.join(' ')} 
            type="textarea" name={props.name} 
            placeholder={props.elementConfig.placeholder} 
            value={props.elementConfig.value} 
            onChange={props.changed}
            />;
            break;
        case ('select'): 
            inputElement = (
                            <select
                                className={inputClasses.join(' ')}
                                value={props.elementConfig.value} 
                                onChange={props.changed}>
                                {props.elementConfig.options.map(item => {
                                    return <option key={item.value} value={item.value}>{item.displayValue}</option>
                                })}
                            </select>
            );
            break;
        default:
            inputElement = <input className={inputClasses} {...props} />;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;