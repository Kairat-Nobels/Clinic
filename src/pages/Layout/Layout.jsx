import { useDispatch } from 'react-redux'
import logo from '../../assets/logo.png'
import styles from './layout.module.css'
import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRecords } from '../../redux/slices/recordSlice'
import CameModal from '../../components/CameModal/CameModal'


function Layout()
{
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    useEffect(() =>
    {
        dispatch(getRecords())
    }, [])

    return (
        <div className="container">
            <nav className={styles.navbar}>
                <div className={styles.left}>
                    <NavLink className={styles.logo} to='/'>
                        <div className={styles.logoImg}><img src={logo} alt="logo" /></div>
                        <h1>Лечебно Оздоровительный Центр</h1>
                    </NavLink>
                    <ul>
                        <li><NavLink to='/services' className={({ isActive }) => (isActive ? styles.active : '')}>Услуги</NavLink></li>
                        <li><NavLink to='/doctors' className={({ isActive }) => (isActive ? styles.active : '')}>Врачи</NavLink></li>
                        <li><NavLink to='/contacts' className={({ isActive }) => (isActive ? styles.active : '')}>Контакты</NavLink></li>
                    </ul>
                </div>
                <div className={styles.info}>
                    <div>
                        <p>Время работы: <br />ПН-СБ: <span>с 9:00 до 18:00</span></p>
                        <p>Тел: <a href='tel:+996500555555'>+996 500 555 555</a></p>
                    </div>
                    <div><button onClick={e => setModal(true)}>Админ</button></div>
                </div>
            </nav>
            {
                modal && <CameModal setModal={setModal} />
            }
            <div className="outlet">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout