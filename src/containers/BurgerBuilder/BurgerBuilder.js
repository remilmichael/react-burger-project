import React, { Component } from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null,
    }

    componentDidMount () {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            }).catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        }
        let newCount = oldCount - 1;
        let newPrice = this.state.totalPrice;

        if (newCount < 0) {
            newCount = 0;
        } else {
            newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        }
        updatedIngredients[type] = newCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState (ingredients) {
        //Due to the way this.setState() function works
        //it is possible that we might get old value if we use
        //const ingredients = this.state.ingredients;
        //so it is better to pass the updated content directly
        //from the function which performs the updation on
        //the "state".
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey]
        }).reduce((sum, current) => {
            return sum + current;
        }, 0)
        this.setState({
            purchasable: sum > 0
        })
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        })
        //Just for Firebase only append the endpoint
        //with ".json" extension.
        const order = {
            ingredients: this.state.ingredients,
            //don't do this on real application 
            //recalculate the price on server, since
            //user may manipulate the price on
            //the client side.
            price: this.state.totalPrice,
            customer: {
                name: 'Someone',
                zipCode: '3342',
                country: 'India',
                email: 'test@test.com',
            },
        }
        
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            }).catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            });
    }

    resetPurchaseHandler = () => {
        this.setState({
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
        })
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
            //this check is necessary because all ingredients are fetched from server
            //after the components are mounted. Since ingredients are set to "null"
            //it triggers an error. Ingredients are fetched from server
            //in the componentDidMount() hook.
            burger = (<Aux><Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingAdded={this.addIngredientHandler}
                    ingRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchase={this.purchaseHandler}
                    reset={this.resetPurchaseHandler}
                /></Aux>); //Aux is required because react doesn't allow adjacent elements.
            
            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients} 
                            cancelled={this.purchaseCancelHandler} 
                            continue={this.purchaseContinueHandler} 
                            price={this.state.totalPrice} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);