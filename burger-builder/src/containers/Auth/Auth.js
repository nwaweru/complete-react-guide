import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.setAuthRedirectPath('/');
        }
    }, []);

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });

        setControls(updatedControls);
    };

    const submitHandler = event => {
        event.preventDefault();

        const email = controls.email.value;
        const password = controls.password.value;
        const method = isSignup ? 'signup' : 'signin';

        props.authenticate(email, password, method);
    };

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

    const formElementsArray = [];

    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElementsArray.map(formElement => {
        return <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            onChange={event => inputChangeHandler(event, formElement.id)}
        />;
    });

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = '';

    if (props.error) {
        errorMessage = (<p style={{ color: 'red' }}>{props.error.message}</p>);
    }

    let authRedirect = null;

    if (props.authenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}

            <form onSubmit={submitHandler}>
                <h1>{isSignup ? 'Signup' : 'Login'}</h1>
                {errorMessage}
                {form}
                <Button btnType="Success">{isSignup ? 'Signup' : 'Login'}</Button>
            </form>

            <Button
                btnType="Danger"
                onClick={switchAuthModeHandler}
            >Switch to {isSignup ? 'Login' : 'Signup'}</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        authenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password, method) => dispatch(actions.authenticate(email, password, method)),
        setAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
