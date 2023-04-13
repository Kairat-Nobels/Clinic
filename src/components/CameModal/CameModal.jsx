import { useEffect, useState } from "react";
import styles from './cameModal.module.css'
import { Link, useNavigate } from "react-router-dom";

function CameModal({ setModal })
{
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
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
            console.log('Submit');
            navigate('/admin')
            setModal(false)
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
                <button type='submit'>Отправить</button>
            </form >
        </div >
    )
}

export default CameModal