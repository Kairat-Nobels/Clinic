import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Record from '../../components/Record/Record';
import { getRecords } from '../../redux/slices/recordSlice';
import ReviewModal from '../../components/ReviewModal/ReviewModal';
import Review from '../../components/Review/Review';

function ContactsPage()
{
  const [modal, setModal] = useState(false)

  const dispatch = useDispatch()
  const { records, error, loading } = useSelector(state => state.recordsReducer)

  useEffect(() =>
  {
    dispatch(getRecords())
  }, [])
  return (
    <div>
      <h2>Fidback</h2>
      <button onClick={e => setModal(true)}>Оставить отзыв</button>
      <h3>Оставленные отзывы: </h3>
      {
        loading ? <p>loading...</p>
          :
          error ? <h3>{error}</h3>
            :
            records.filter(el => el.type === 2)?.map(r => <Review key={r.id} data={r} />)
      }
      {
        modal && <ReviewModal setModal={setModal} />
      }
    </div>
  )
}

export default ContactsPage