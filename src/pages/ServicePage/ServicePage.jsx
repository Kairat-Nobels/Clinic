import ServiceCard from '../../components/ServiceCard/ServiceCard'
import styles from './servicePage.module.css'
import { useDispatch, useSelector } from 'react-redux'

function ServicePage()
{
    const dispatch = useDispatch()
    const {services} = useSelector(state => state.servicesReducer)
    return (
        <div className={styles.page}>
            <h2>Медицинские услиги:</h2>
            <div className={styles.service}>
                {
                    services.map(s => <ServiceCard key={s.id} data={s} />)
                }
            </div>
        </div>
    )
}

export default ServicePage