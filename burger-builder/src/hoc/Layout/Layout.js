import React, { Component } from 'react';

import classes from './Layout.css';
import Aux from '../../hoc/Aux/Aux';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = { showSideDrawer: false };

    toggleSideDrawerHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    authenticated={this.props.authenticated}
                    showSideDrawer={this.toggleSideDrawerHandler}
                />

                <SideDrawer
                    authenticated={this.props.authenticated}
                    open={this.state.showSideDrawer}
                    closed={this.toggleSideDrawerHandler}
                />

                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
        );
    }
};

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
