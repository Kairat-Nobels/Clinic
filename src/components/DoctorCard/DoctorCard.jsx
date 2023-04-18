import styles from './doctorCard.module.css'

function DoctorCard({ data })
{
    return (
        <div className={styles.card}>
            <div className={styles.img}><img src={data.img} alt="img" /></div>
            <h3>{data.name}</h3>
            <h3 className={styles.post}>{data.post}</h3>
            <h4><span>Образование: </span>{data.education}</h4>
            <p><span>Возраст: </span> {data.age} лет</p>
            <p><span>Стаж: </span> {data.experience}</p>
        </div>
    )
}

export default DoctorCard