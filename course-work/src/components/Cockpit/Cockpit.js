import React, { useEffect, useRef } from 'react';
import styles from './Cockpit.css';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        
        // setTimeout(() => {
        //     alert('Changes Saved!');
        // }, 1000);

        toggleBtnRef.current.click();

        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');

        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
    });

    const assignedClasses = [];

    if (props.personsLength <= 2) {
        assignedClasses.push(styles.red);
    }

    if (props.personsLength <= 1) {
        assignedClasses.push(styles.bold);
    }

    let btnClass = '';

    if (props.showPersons) {
        btnClass = styles.Red;
    }

    return (
        <div className={styles.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is working!</p>

            <button 
                className={btnClass} 
                ref={toggleBtnRef}
                onClick={props.togglePersons}
            >Toggle Persons</button>

            <button onClick={props.login}>Login</button>
        </div>
    );
};

export default React.memo(cockpit);