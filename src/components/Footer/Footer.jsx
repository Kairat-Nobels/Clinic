import { NavLink } from 'react-router-dom'
import styles from './footer.module.css'
import logo from '../../assets/logo.png'
import tel from '../../assets/images/tel.png'
import whats from '../../assets/images/whatsApp.png'
import insta from '../../assets/images/Instagram.png'
import faceBookicon from '../../assets/images/faceBookicon.png'

function Footer()
{
    return (
        <>
            <nav className={styles.navbar}>
                <NavLink className={styles.logo} to='/'>
                    <div className={styles.logoImg}><img src={logo} alt="logo" /></div>
                    <h1>Лечебно Оздоровительный Центр</h1>
                </NavLink>
                <ul>
                    <li><a target='_blank' href="https://www.facebook.com/"><div><img src={faceBookicon} alt="img" /></div></a></li>
                    <li><a target='_blank' href="https://www.instagram.com/Sknfxx"><div><img src={insta} alt="img" /></div></a></li>
                    <li><a target='_blank' href="https://wa.me/996551808551"><div><img src={whats} alt="img" /></div></a></li>
                </ul>
                <div className={styles.info}>
                    <div>
                        <p className={styles.workTime}>Время работы: <span>ПН-СБ: с 9:00 до 18:00</span></p>
                        <div className={styles.tel}><img className={styles.telIcon} src={tel} alt="" /><a href='tel:+996500555555'>+996 500 555 555</a></div>
                    </div>
                    <NavLink className={styles.linkBtn} to={'/services'}>Записаться</NavLink>
                </div>
            </nav>
            <div className={styles.mobileFooter}>
                <ul>
                    <li><a target='_blank' href="https://www.facebook.com/"><div><img src={faceBookicon} alt="img" /></div></a></li>
                    <li><a target='_blank' href="https://www.instagram.com/"><div><img src={insta} alt="img" /></div></a></li>
                    <li><a target='_blank' href="https://api.whatsapp.com/"><div><img src={whats} alt="img" /></div></a></li>
                </ul>
                <NavLink className={styles.linkBtn} to={'/services'}>Записаться</NavLink>
            </div>
        </>
    )
}

export default Footer