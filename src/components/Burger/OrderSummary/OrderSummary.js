import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';

class OrderSummary extends Component {

    //This could be a functional component, doesn't have to be Class component
    // componentDidUpdate() {
    //     console.log("update");
    // }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
            return (
            <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey} : {this.props.ingredients[igKey]}</span>
            </li>);
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Burger with following ingredients : </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continue}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;