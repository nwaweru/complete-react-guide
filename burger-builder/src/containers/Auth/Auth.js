import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignup: true
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath('/');
        }
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({ controls: updatedControls });
    };

    submitHandler = event => {
        event.preventDefault();

        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const method = this.state.isSignup ? 'signup' : 'signin';

        this.props.authenticate(email, password, method);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
                onChange={(event) => this.inputChangeHandler(event, formElement.id)}
            />;
        });

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = '';

        if (this.props.error) {
            errorMessage = (
                <p style={{ color: 'red' }}>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;

        if (this.props.authenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}

                <form onSubmit={this.submitHandler}>
                    <h1>{this.state.isSignup ? 'Signup' : 'Login'}</h1>
                    {errorMessage}
                    {form}
                    <Button btnType="Success">{this.state.isSignup ? 'Signup' : 'Login'}</Button>
                </form>

                <Button
                    btnType="Danger"
                    onClick={this.switchAuthModeHandler}
                >Switch to {this.state.isSignup ? 'Login' : 'Signup'}</Button>
            </div>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
