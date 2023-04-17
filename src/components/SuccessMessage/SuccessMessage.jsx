import React, { useState } from 'react';
import styles from './SuccessMessage.module.css';

const SuccessMessage = ({ message }) =>
{
    return (
        <div className={styles.successMessage}>
            {(
                <div className={styles.animation}>
                    <svg className={styles.animate} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#3da35a" fill="transparent" />
                    </svg>
                </div>
            )}
            <p className={styles.successText}>{message}</p>
        </div>
    );
};

export default SuccessMessage;