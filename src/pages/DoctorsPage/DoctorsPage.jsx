
import { useSelector } from 'react-redux'
import styles from './doctorsPage.module.css'
import DoctorCard from '../../components/DoctorCard/DoctorCard'

function DoctorsPage()
{

  const { doctors, loading, error } = useSelector(state => state.servicesReducer)
  return (
    <div className={styles.page}>
      <h2>Наши Врачи:</h2>
      <div className={styles.doctors}>
        {
          loading ? <p>loading...</p> :
            error ? <p>Error: {error}</p> :
              doctors.map(s => <DoctorCard key={s.id} data={s} />)
        }
      </div>
    </div>
  )
}

export default DoctorsPage