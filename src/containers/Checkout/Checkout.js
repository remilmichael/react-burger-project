import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['salad', '1'] -- format
            if (param[0] === 'price') {
                price = (+param[1]).toFixed(2);
            } else {
                ingredients[param[0]] = +param[1];
            }
            this.setState({
                ingredients: ingredients,
                price: price
            })
        }
    }

    checkoutCancelled = () => {
        this.props.history.goBack(); //goes back to the last page.
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelled} 
                    checkoutContinued={this.checkoutContinued}
                />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                render={(props) => (<ContactData 
                    ingredients={this.state.ingredients} 
                    price={this.state.price}
                {...props} />)} />
            </div>
        );
    }
}

export default Checkout;