import React from 'react';

import styles from './DrawerToggle.css';

const drawerToggler = (props) => (
    <div className={styles.DrawerToggle} onClick={props.showSideDrawer}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggler;
