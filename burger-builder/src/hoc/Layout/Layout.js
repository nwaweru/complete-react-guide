import React, { Component } from 'react';

import styles from './Layout.css';
import Aux from '../../hoc/Aux/Aux';
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
                <Toolbar showSideDrawer={this.toggleSideDrawerHandler} />
                
                <SideDrawer open={this.state.showSideDrawer} closed={this.toggleSideDrawerHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux >
        );
    }
};

export default Layout;
