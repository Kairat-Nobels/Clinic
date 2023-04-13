import { useEffect, useState } from 'react';
import styles from './reviewModal.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { createRecord, getRecords } from '../../redux/slices/recordSlice';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SuccessMessage from '../SuccessMessage/SuccessMessage';

function ReviewModal({ setModal })
{
    const [result, setResult] = useState(false)
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const { error, loading, success } = useSelector(state => state.recordsReducer)
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
    }, [])
    const closeModal = (e) =>
    {
        if (!document.querySelector('form').contains(e.target) && !result) {
            document.body.style.overflow = '';
            setModal(false)
        }
    }
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setResult(true)
        const rew = {
            type: 2,
            name: name,
            comment: comment
        }
        dispatch(createRecord(rew))
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
            <form onSubmit={handleSubmit} className={styles.form} action="">
                <h2>Оставьте отзыв</h2>
                {
                    result ?
                        (loading ? <p>Loading...</p> :
                            error ? <ErrorMessage message={error} />
                                : <SuccessMessage message={success} />
                        )
                        :
                        <>
                            <div>
                                <label>Имя: </label>
                                <input value={name} onChange={e => setName(e.target.value)} required type="text" />
                            </div>
                            <div>
                                <label>Отзыв: </label>
                                <textarea value={comment} onChange={e => setComment(e.target.value)} required cols="20" rows="4"></textarea>
                            </div>
                            <button type='submit'>Отправить</button>
                        </>
                }
            </form >
        </div >
    )
}

export default ReviewModal