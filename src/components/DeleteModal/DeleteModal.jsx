import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import { deleteRecord, getRecords } from '../../redux/slices/recordSlice';
import styles from './deleteModal.module.css';
function DeleteModal({ setModal, id })
{
    const [result, setResult] = useState(false)
    const dispatch = useDispatch()
    const { error, loading, success } = useSelector(state => state.recordsReducer)
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
    }, [])
    const closeModal = (e) =>
    {
        if (!document.querySelector('section').contains(e.target) && !result) {
            document.body.style.overflow = '';
            setModal(false)
        }
    }
    const hadnleDelete = () =>
    {
        setResult(true)
        dispatch(deleteRecord(id))
        document.body.style.overflow = '';
        setTimeout(() =>
        {
            !loading && setResult(false)
            setModal(false)
            dispatch(getRecords())
        }, 4100);
    }
    return (
        <div onClick={closeModal} className={styles.window}>
            <section className={styles.form}>
                <h2>Вы уверены что хотите удалить?</h2>
                {
                    result ?
                        (loading ? <p>Loading...</p> :
                            error ? <ErrorMessage message={error} /> :
                                <SuccessMessage message={success} />
                        )
                        :
                        <div>
                            <button onClick={hadnleDelete}>Да</button>
                            <button onClick={() =>
                            {
                                document.body.style.overflow = ''
                                setModal(false)
                            }}>Нет</button>
                        </div>
                }
            </section>
        </div >
    )
}

export default DeleteModal