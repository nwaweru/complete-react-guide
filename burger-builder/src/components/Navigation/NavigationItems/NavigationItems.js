import React from 'react';

import styles from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={styles.NavigationItems}>
        <NavigationItem href="/" active>Burger Builder</NavigationItem>
        <NavigationItem href="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;
