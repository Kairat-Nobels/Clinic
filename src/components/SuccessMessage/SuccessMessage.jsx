import React, { useEffect, useState } from 'react';
import styles from './SuccessMessage.module.css';
import { getRecords } from '../../redux/slices/recordSlice';
import { useDispatch, useSelector } from 'react-redux';

const SuccessMessage = ({ message }) =>
{
    console.log(message);
    const [showAnimation, setShowAnimation] = useState(true);
    const dispatch = useDispatch()
    // Обработчик события для анимации галочки
    const { loading } = useSelector(state => state.recordsReducer)
    setTimeout(() =>
    {
        setShowAnimation(false);
    }, 4000); // скрыть сообщение и анимацию через 3 секунды

    useEffect(() =>
    {
        if (message === 'Вы успешно записались' && !loading) {
            console.log('new');
        }
    }, [])

    return (
        <div className={styles.successMessage}>
            {showAnimation && (
                <div className={styles.animation}>
                    <svg className={styles.animate} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#3da35a" fill="transparent" />
                    </svg>
                </div>
            )}
            {showAnimation && <p className={styles.successText}>{message}</p>}
        </div>
    );
};

export default SuccessMessage;