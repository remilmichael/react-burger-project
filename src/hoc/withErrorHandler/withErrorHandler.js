import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        // componentDidMount() { //Not getting required output here -> componentWillMount() is required which is "obsolete".
        //     //This lifecycle hook only executes when all
        //     //of its child components are mounted.
        //     axios.interceptors.request.use(req => {
        //         this.setState({
        //             error: null
        //         })
        //         return req;
        //     })

        //     axios.interceptors.response.use(resp => resp, error => { //shortest way to return response in interceptor. : resp => resp
        //         this.setState({
        //             error: error
        //         });
        //     });
        // }

        interceptorHandler = () => {
            axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req;
            })

            axios.interceptors.response.use(resp => resp, error => { //shortest way to return response in interceptor. : resp => resp
                this.setState({
                    error: error
                });
            });
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }
        render() {
            this.interceptorHandler();
            const modalContent = this.state.error ? this.state.error.message : null;
            return ( 
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {modalContent}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;