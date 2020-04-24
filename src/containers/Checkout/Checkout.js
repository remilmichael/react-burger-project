import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    /* state = {
        ingredients: null,
        price: 0
    } */

    /* componentDidMount() {
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
    } */

    checkoutCancelled = () => {
        this.props.history.goBack(); //goes back to the last page.
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingr) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (<div>
                        {purchasedRedirect}
                        <CheckoutSummary 
                        ingredients={this.props.ingr} 
                        checkoutCancelled={this.checkoutCancelled} 
                        checkoutContinued={this.checkoutContinued}
                        />
                      <Route 
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                      /></div>);
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);