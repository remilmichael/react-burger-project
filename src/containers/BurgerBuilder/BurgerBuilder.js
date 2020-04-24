import React, { Component } from "react";
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// };

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.props.onInitIngredients();
    }

    state = {
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        // loading: false,
        // error: null,
    }

    //componentDidMount () {
        /* axios.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            }).catch(error => {
                this.setState({
                    error: error
                })
            }) */
    //}
    
    //      NOW HANDLED BY REDUX.

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     let newCount = oldCount - 1;
    //     let newPrice = this.state.totalPrice;

    //     if (newCount < 0) {
    //         newCount = 0;
    //     } else {
    //         newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    //     }
    //     updatedIngredients[type] = newCount;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

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
        return sum > 0;
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
        /* const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        }); */
        this.props.ontInitPurchase();
        this.props.history.push('/checkout');
    }

    // resetPurchaseHandler = () => {
    //     this.setState({
    //         ingredients: {
    //             salad: 0,
    //             bacon: 0,
    //             cheese: 0,
    //             meat: 0
    //         },
    //         totalPrice: 4,
    //         purchasable: false,
    //         purchasing: false,
    //     })
    // }

    render() {
        const disabledInfo = {
            ...this.props.ings //redux store
        };
        
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if ( this.props.ings ) {
            //this check is necessary because all ingredients are fetched from server
            //after the components are mounted. Since ingredients are set to "null"
            //it triggers an error. Ingredients are fetched from server
            //in the componentDidMount() hook.
            burger = (<Aux><Burger ingredients={this.props.ings} />
                <BuildControls 
                    ingAdded={this.props.onIngredientAdded}
                    ingRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    purchase={this.purchaseHandler}
                    reset={this.props.onResetIngredients}
                /></Aux>); //Aux is required because react doesn't allow adjacent elements.
            
            orderSummary = <OrderSummary 
                            ingredients={this.props.ings} 
                            cancelled={this.purchaseCancelHandler} 
                            continue={this.purchaseContinueHandler} 
                            price={this.props.totalPrice} />;
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        error: state.burgerBuilder.error,
        totalPrice: state.burgerBuilder.totalPrice,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onResetIngredients: () => dispatch(burgerBuilderActions.resetIngredients()),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        ontInitPurchase : () => dispatch(burgerBuilderActions.purchaseInit())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));