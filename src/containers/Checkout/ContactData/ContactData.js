import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                touched: false,
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                touched: false,
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 7
                },
                touched: false,
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                touched: false,
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                touched: false,
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true
            },
        },
        isFormValid: false,
        loading: false
    }

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

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState({
            loading: true
        })

        let formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        //Just for Firebase only append the endpoint
        //with ".json" extension.
        const order = {
            ingredients: this.props.ingredients,
            //don't do this on real application 
            //recalculate the price on server, since
            //user may manipulate the price on
            //the client side.
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value)
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        if (updatedFormElement.hasOwnProperty('validation')) {
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        }
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            isFormValid: formIsValid
        });
        // console.log(updatedFormElement);
    }

    render() {
        let formElements = [];
        for (let key in this.state.orderForm) {
            const elm = <Input key={key} 
                name={key}
                inputtype={this.state.orderForm[key].elementType} 
                elementConfig={this.state.orderForm[key].elementConfig}
                value={this.state.orderForm[key].value} 
                changed={(event) => this.inputChangedHandler(event, key)}
                touched={this.state.orderForm[key].touched}
                shouldValidate={this.state.orderForm[key].hasOwnProperty('validation') ? true : false}
                invalid={!this.state.orderForm[key].valid} />;

            formElements.push(elm);
        }
        let form = (
            <React.Fragment>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {formElements.map(items => {
                        return items;
                    })}
                    <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.isFormValid}>ORDER</Button>
                </form>
            </React.Fragment>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div classes={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default ContactData;