import { NavLink } from 'react-router-dom'
import styles from './serviceCard.module.css'

function ServiceCard({data}) {
    return (
        <NavLink state={data} to={`/services/${data.id}`} className={styles.card}>
            <div><img src={data.img} alt="img" /></div>
            <h3>{data.name}</h3>
        </NavLink>
    )
}

export default ServiceCard