import React from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);        

        return (
            <Aux>
                <Modal show={error} closeModal={clearError}>
                    {error ? <p style={{ textAlign: 'center' }}>{error.message}</p> : null}
                </Modal>

                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default withErrorHandler;
