import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        UNSAFE_componentWillMount() {
            this.requestInterceptors = axios.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            });

            this.responseInterceptors = axios.interceptors.response.use(response => response, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptors);
            axios.interceptors.response.eject(this.responseInterceptors);
        }

        closeModalHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} closeModal={this.closeModalHandler}>
                        {this.state.error ? <p style={{ textAlign: 'center' }}>{this.state.error.message}</p> : null}
                    </Modal>

                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;
