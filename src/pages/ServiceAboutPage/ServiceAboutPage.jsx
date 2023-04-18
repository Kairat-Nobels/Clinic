import { useLocation, useNavigate } from "react-router-dom"
import Category from "../../components/Category/Category";
import Doctor from "../../components/Doctor/Doctor";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from './serviceAboutPage.module.css'
import ReviewModal from "../../components/ReviewModal/ReviewModal";
function ServiceAboutPage()
{
    const [modal, setModal] = useState(false)
    const [reviewModal, setReviewModal] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() =>
    {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>назад</button>
            <div className={styles.about}>
                <h3>{location.state.name}</h3>
                <div className={styles.aboutHead}>
                    <p>{location.state.description}</p>
                    <div className={styles.image}><img src={location.state.img} alt="img" /></div>
                </div>
            </div>
            <div className={styles.flex}>
                <div className={styles.service}>
                    <h4>Услуги клиники:</h4>
                    {
                        location.state.categories.map(obj => <Category key={obj.name} obj={obj} />)
                    }
                </div>
                <div className={styles.doctors}>
                    <h4>Врачи отделения:</h4>
                    {
                        location.state.doctors.map(obj => <Doctor key={obj.name} obj={obj} />)
                    }
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={() => setModal(true)}>Записаться на приём</button>
                <button onClick={() => setReviewModal(true)}>Оставить отзыв</button>
            </div>
            {
                modal && <Modal setModal={setModal} data={location.state} />
            }
            {
                reviewModal && <ReviewModal setModal={setReviewModal} />
            }
        </div>
    )
}

export default ServiceAboutPage