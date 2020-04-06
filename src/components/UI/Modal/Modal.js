import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        //In this application we're only checking the
        //"show" property. So it's okay with this code
        //if more states are required to be monitored
        //then more checking is required.
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0',
                }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;