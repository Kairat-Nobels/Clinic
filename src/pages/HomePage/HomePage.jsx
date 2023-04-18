import styles from './homePage.module.css'
import hello from '../../assets/images/hello2.jpg'
import searchIcon from '../../assets/images/searchIcon.png'
import serviceIcon from '../../assets/images/serviceIcon.png'
import { useSelector } from 'react-redux'
import HomeCards from '../../components/HomeCards/HomeCards'
import SwipperSlider from '../../components/SwipperSlider/SwipperSlider'
import HomeDoctors from '../../components/HomeDoctors/HomeDoctors'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from 'react'
import ReviewModal from '../../components/ReviewModal/ReviewModal'
import Spinner from '../../components/Spinner/Spinner'

function HomePage()
{
  const [modal, setModal] = useState(false)
  const { records } = useSelector(state => state.recordsReducer)
  const { doctors, loading, error } = useSelector(state => state.servicesReducer)
  const reviews = records.filter(el => el.type === 2)
  console.log(reviews);

  const handleSubmit = (e) =>
  {
    e.preventDefault()
    alert('Сообщение отправлено')
    e.target.reset()
  }

  useEffect(() =>
  {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={styles.page}>
      <div className={styles.hello}>
        <div className={styles.left}>
          <h1>Самое главное - это здоровье.</h1>
          <p>Добро пожаловать на наш сайт <span>Лечебно Оздоровительного центра</span>, где мы готовы помочь вам заботиться о вашем здоровье. Мы понимаем, что здоровье - это важнейшее богатство, и поэтому предлагаем широкий спектр медицинских услуг, чтобы помочь вам достичь и поддерживать оптимальное здоровье. </p>
          <a href="#homeCards">Подробнее</a>
        </div>
        <div className={styles.right}><img src={hello} alt="img" /></div>
      </div>
      <HomeCards />
      <div className={styles.about}>
        <h2>О Лечебно Оздоровительном центре</h2>
        <div className={styles.aboutLine}></div>
        <div className={styles.aboutText}>
          <p>Мы являемся Лечебно оздоровительным центром, который заботится о здоровье своих пациентов. В нашем центре мы считаем, что здоровье - это наиважнейшее богатство, и мы стремимся предоставить вам качественные медицинские услуги для того, чтобы помочь вам достичь и поддерживать оптимальное здоровье.</p>
          <p>Наш центр предлагает широкий спектр медицинских услуг, включая общую практику, стоматологию, косметическую медицину, физиотерапию, а также другие услуги, которые помогут вам улучшить свое здоровье и качество жизни.</p>
          <p>Мы гордимся тем, что наши специалисты - это высококвалифицированные врачи, которые заботятся о каждом пациенте индивидуально. Они проходят постоянное обучение и обладают самыми современными знаниями и технологиями, чтобы обеспечить вам лучшее лечение.</p>
          <p>Если вы ищете место, где вас будут лечить с заботой и профессионализмом, то наш Лечебно оздоровительный центр - это именно то место, которое вы искали. Мы готовы помочь вам достичь и поддерживать оптимальное здоровье, и наша дружелюбная команда с нетерпением ждет вас в нашем центре. Свяжитесь с нами, чтобы узнать больше о наших услугах и сделать запись на прием.</p>
        </div>
        <div className={styles.reviewsModal}>
          <div className={styles.docLink}>
            <NavLink to={'/services'}>
              <p>Посмотреть все услуги</p>
              <div><img src={serviceIcon} alt="img" /></div>
            </NavLink>
          </div>
          <button onClick={e => setModal(true)}>Оставить отзыв</button>
        </div>
        {
          modal && <ReviewModal setModal={setModal} />
        }
      </div>
      <div className={styles.doctors}>
        <h2>Врачи Лечебно Оздоровительной клиники: </h2>
        {loading ? <Spinner />
          :
          error ? <div className='fetchError'><p>😕 Error: {error}</p><p>Проверьте Интернет и Обновите страницу</p></div> :
            <>
              <div className={styles.cardsDoc}>
                {
                  doctors.slice(0, 6).filter((v, i) => i % 2 === 1).map(s => <HomeDoctors key={s.id} data={s} />)
                }
              </div>
              <div className={styles.docLink}>
                <NavLink to={'/doctors'}>
                  <p>Посмотреть всех врачей</p>
                  <div><img src={searchIcon} alt="img" /></div>
                </NavLink>
              </div>
            </>
        }
      </div>
      {
        reviews.length > 0 && <SwipperSlider items={reviews} />
      }
      <div className={styles.feedBack}>
        <div className={styles.maps}><iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7152.3320809180705!2d74.58583543977271!3d42.87600234377875!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skg!4v1681735273241!5m2!1sru!2skg" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
        <div className={styles.sendMes}>
          <h2>Связаться</h2>
          <p>Вы можете отправить своё сообщение в наш центр.</p>
          <form className={styles.formMes} onSubmit={handleSubmit} action="">
            <div>
              <label htmlFor="">Имя: </label>
              <input required type="text" />
            </div>
            <div>
              <label htmlFor="">Email: </label>
              <input required type="email" />
            </div>
            <div className={styles.message}>
              <label htmlFor="">Сообщение: </label>
              <textarea required cols="30" rows="4"></textarea>
            </div>
            <button type='submit'>Отправить</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage