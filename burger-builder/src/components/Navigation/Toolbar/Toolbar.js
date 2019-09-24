import React from 'react';

import Logo from '../../Logo/Logo';
import styles from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => (
    <header className={styles.Toolbar}>
        <DrawerToggle showSideDrawer={props.showSideDrawer} />

        <div className={styles.Logo}>
            <Logo />
        </div>

        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);
export default toolbar;
