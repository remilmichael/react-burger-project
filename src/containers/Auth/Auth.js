import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.modules.css';
import * as action from '../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        controls: {
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                touched: false,
                valid: false
            },
            password:{
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                touched: false,
                valid: false
            },
        },
        isSignUp: true,

    };

    checkValidity(value, rules) {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({
            controls: updatedControls
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    switchAuthModeHandler = (event) => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        });
    }

    render() {
        let formElements = [];
        for (let key in this.state.controls) {
            const elm = <Input key={key}
                            name={key}
                            inputtype={this.state.controls[key].elementType}
                            elementConfig={this.state.controls[key].elementConfig}
                            value={this.state.controls[key].value}
                            changed={(event) => this.inputChangedHandler(event, key)}
                            touched={this.state.controls[key].touched}
                            shouldValidate={this.state.controls[key].hasOwnProperty('validation') ? true : false}
                            invalid={!this.state.controls[key].valid}
                            />;
            formElements.push(elm);
        }
        let form = null;
        if (this.props.loading) {
            form = <Spinner />;
        } else {
            form = formElements.map(item => {
                return item;
            })
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p style={{ color: 'red'}}>{this.props.error.message}</p>;
            //"message" comes from firebase, since "error" is a javascript object.
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                     {form}
                     <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignUp ? 'Sign-in' : 'Sign-Up'}
                </Button>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(action.auth(email, password, isSignUp))
    };
};


export default connect(mapStatetoProps, mapDispatchToProps)(Auth);