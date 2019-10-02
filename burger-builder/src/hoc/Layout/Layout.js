import React, { useState } from 'react';

import classes from './Layout.css';
import Aux from '../../hoc/Aux/Aux';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const toggleSideDrawerHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return (
        <Aux>
            <Toolbar
                authenticated={props.authenticated}
                showSideDrawer={toggleSideDrawerHandler}
            />

            <SideDrawer
                authenticated={props.authenticated}
                open={showSideDrawer}
                closed={toggleSideDrawerHandler}
            />

            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux >
    );
};

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);
