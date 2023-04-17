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
    const { delError, delLoading, delMessage } = useSelector(state => state.recordsReducer)
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

    }
    return (
        <div onClick={closeModal} className={styles.window}>
            <section className={styles.form}>
                <h2>Удаление</h2>
                {
                    result ?
                        (delLoading ? <p>Loading...</p> :
                            <div>
                                <button className={styles.closeBtn} onClick={() =>
                                {
                                    dispatch(getRecords())
                                    document.body.style.overflow = ''
                                    setModal(false)
                                    setResult(false)
                                }
                                }>X</button>
                                {
                                    delError ? <ErrorMessage message={delError} /> :
                                        <SuccessMessage message={delMessage} />
                                }
                            </div>
                        )
                        :
                        <div>
                            <h2>Вы уверены что хотите удалить?</h2>
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