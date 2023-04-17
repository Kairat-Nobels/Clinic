import styles from './review.module.css'
import image from '../../assets/images/userIcon.png'
function Review({ data })
{
    return (
        <div className={styles.review}>
            <div className={styles.head}>
                <div className={styles.imageUser}><img src={image} alt="Smashicons" /></div>
                <p> {data.name}</p>
            </div>
            <p>Отзыв: <br />{data.comment}</p>
            <p>---------------------------</p>
            <br />
        </div>
    )
}

export default Review