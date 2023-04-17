import { useEffect, useState } from "react";
import styles from './cameModal.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cameAdmin } from "../../redux/slices/adminSlice";

function CameModal({ setModal })
{
    const [login, setLogin] = useState('');
    const [valid, setValid] = useState(null);
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
    }, [])
    const closeModal = (e) =>
    {
        if (!document.querySelector('form').contains(e.target)) {
            document.body.style.overflow = '';
            setModal(false)
        }
    }
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (login === 'admin' && password === 'admin') {
            document.body.style.overflow = '';
            dispatch(cameAdmin())
            navigate('/admin')
            setModal(false)
            setValid(null)
        }
        else {
            setValid(true)
        }
    }
    return (
        <div onClick={closeModal} className={styles.window}>
            <form onSubmit={handleSubmit} className={styles.form} action="">
                <h2>Авторизация</h2>
                <div>
                    <label>Login: </label>
                    <input value={login} onChange={e => setLogin(e.target.value)} required type="text" />
                </div>
                <div>
                    <label>Пароль: </label>
                    <input value={password} onChange={e => setPassword(e.target.value)} required type="password"></input>
                </div>
                {
                    valid && <h3>Неправильный Логин или Пароль</h3>
                }
                <button type='submit'>Отправить</button>
            </form >
        </div >
    )
}

export default CameModal