import styles from './homePage.module.css'
import hello from '../../assets/images/hello2.jpg'
import { useSelector } from 'react-redux'
import HomeCards from '../../components/HomeCards/HomeCards'
import SwipperSlider from '../../components/SwipperSlider/SwipperSlider'
function HomePage()
{
  const { records } = useSelector(state => state.recordsReducer)
  const reviews = records.filter(el => el.type === 2)
  console.log(reviews);
  return (
    <div className={styles.page}>
      <div className={styles.hello}>
        <div className={styles.left}>
          <h1>Самое главное - это здоровье.</h1>
          <p>Добро пожаловать на наш сайт медицинской клиники, где мы готовы помочь вам заботиться о вашем здоровье. Мы понимаем, что здоровье - это важнейшее богатство, и поэтому предлагаем широкий спектр медицинских услуг, чтобы помочь вам достичь и поддерживать оптимальное здоровье. </p>
          <a href="#homeCards">Подробнее</a>
        </div>
        <div className={styles.right}><img src={hello} alt="img" /></div>
      </div>
      <HomeCards />
      {
        reviews.length > 0 && <SwipperSlider items={reviews} />
      }
    </div>
  )
}

export default HomePage