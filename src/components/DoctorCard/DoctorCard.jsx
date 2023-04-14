import styles from './doctorCard.module.css'

function DoctorCard({ data })
{
    return (
        <div className={styles.card}>
            <div className={styles.img}><img src={data.img} alt="img" /></div>
            <h3>{data.name} {data.post}</h3>
            <p>Возраст: {data.age}</p>
            <h4>Образование: {data.education}</h4>
            <p>Стаж: {data.experience}</p>
            <p>{data.deal}</p>
        </div>
    )
}

export default DoctorCard