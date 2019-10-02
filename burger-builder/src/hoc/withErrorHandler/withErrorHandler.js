import React, { useState, useEffect } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const requestInterceptors = axios.interceptors.request.use(request => {
            setError(null);
            return request;
        });

        const responseInterceptors = axios.interceptors.response.use(response => response, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptors);
                axios.interceptors.response.eject(responseInterceptors);
            };
        }, [requestInterceptors, responseInterceptors]);

        const closeModalHandler = () => {
            setError(null);
        }

        return (
            <Aux>
                <Modal show={error} closeModal={closeModalHandler}>
                    {error ? <p style={{ textAlign: 'center' }}>{error.message}</p> : null}
                </Modal>

                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default withErrorHandler;
