import { useLocation, useNavigate } from "react-router-dom"
import Category from "../../components/Category/Category";
import Doctor from "../../components/Doctor/Doctor";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

function ServiceAboutPage()
{
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div>
            <button onClick={() => navigate(-1)}>назад</button>
            <h3>{location.state.name}</h3>
            <div>
                <h4>Услуги клиники:</h4>
                {
                    location.state.categories.map(obj => <Category key={obj.name} obj={obj} />)
                }
            </div>
            <div>
                <h4>Врачи отделения:</h4>
                {
                    location.state.doctors.map(obj => <Doctor key={obj.name} obj={obj} />)
                }
            </div>
            <button onClick={() => setModal(true)}>Записаться на приём</button>
            {
                modal && <Modal setModal={setModal} data={location.state} />
            }
        </div>
    )
}

export default ServiceAboutPage