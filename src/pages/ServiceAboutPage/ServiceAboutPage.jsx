import { useParams, useNavigate } from "react-router-dom";
import Category from "../../components/Category/Category";
import Doctor from "../../components/Doctor/Doctor";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from './serviceAboutPage.module.css';
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import { useSelector } from "react-redux";

function ServiceAboutPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);

    const { services, loading } = useSelector(state => state.servicesReducer);
    const service = services.find(s => s.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading || !service) return <h2 style={{ textAlign: 'center' }}>Загрузка...</h2>;

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>назад</button>
            <div className={styles.about}>
                <h3>{service.name}</h3>
                <div className={styles.aboutHead}>
                    <p>{service.description}</p>
                    <div className={styles.image}><img src={service.img} alt="img" /></div>
                </div>
            </div>
            <div className={styles.flex}>
                <div className={styles.service}>
                    <h4>Услуги клиники:</h4>
                    {service.categories.map(obj => <Category key={obj.name} obj={obj} />)}
                </div>
                <div className={styles.doctors}>
                    <h4>Врачи отделения:</h4>
                    {service.doctors.map(obj => <Doctor key={obj.name} obj={obj} />)}
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={() => setModal(true)}>Записаться на приём</button>
                <button onClick={() => setReviewModal(true)}>Оставить отзыв</button>
            </div>

            {modal && <Modal setModal={setModal} data={service} />}
            {reviewModal && <ReviewModal setModal={setReviewModal} />}
        </div>
    );
}

export default ServiceAboutPage;
