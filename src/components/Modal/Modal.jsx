import React, { useEffect, useState } from 'react';
import styles from './modal.module.css'
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createRecord, getRecords } from '../../redux/slices/recordSlice';
const Modal = ({ setModal, data }) =>
{
  const [result, setResult] = useState(false)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const dispatch = useDispatch()
  const { error, loading, success, records } = useSelector(state => state.recordsReducer)
  const fillterRecords = records.filter(r => r.type === 1 && r.service === selectedService)
  const today = new Date();

  const dates = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
    const dateString = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const dayOfWeek = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' }).format(date);
    if (dayOfWeek !== 'воскресенье') {
      dates.push({ date: dateString, dayOfWeek });
    }
  }

  const times = [];
  const currentHour = today.getHours() + 1;

  const startHour = 9;
  const endHour = 18;
  for (let hour = startHour; hour < endHour; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    times.push(time);
  }
  for (const time of times) {
    for (const rTime of fillterRecords) {
      if (rTime.time === time) {
        let i = times.indexOf(time);
        times.splice(i, 1);
      }
    }
  }

  // ---
  const body = document.body;
  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setResult(true)
    body.style.overflow = '';
    const rec = {
      type: 1,
      name: name,
      phone: phone,
      service: selectedService,
      date: selectedDate,
      time: selectedTime
    }
    dispatch(createRecord(rec))
    setTimeout(() =>
    {
      !loading && setResult(false)
      setModal(false)
    }, 4100);
  };

  useEffect(() =>
  {
    body.style.overflow = 'hidden';
  }, [])
  const closeModal = (e) =>
  {
    if (!document.querySelector('form').contains(e.target) && !result) {
      body.style.overflow = '';
      setModal(false)
    }
  }

  return (
    <div onClick={closeModal} className={styles.window}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>Запись на приём</h2>
        {
          result ?
            (loading ? <p>Идёт запись...</p>
              :
              error ? <ErrorMessage message={error} />
                : <SuccessMessage message={success} />
            )
            :
            <>
              <div className="form-group">
                <label htmlFor="name">Имя: </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Телефон: </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className='from-group'>
                <label htmlFor="time">Услуга: </label>
                <select id='service' required value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                  <option value=''>Выберите услугу</option>
                  {
                    data.categories.map(el => <option key={el.name} value={el.name}>{el.name}</option>)
                  }
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Дата: </label>
                <select
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                >
                  <option value="" disabled>Выберите дату</option>
                  {dates.map((date) => (
                    <option key={date.date} value={date.date}>{`${date.dayOfWeek}, ${date.date}`}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="time">Время: </label>
                <select disabled={selectedDate.length > 0 ? false : true} id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
                  <option value="" disabled>Выберите время</option>
                  {
                    dates[0].date === selectedDate ?
                      times.filter(el =>
                        Number(el.slice(0, 2)) >= currentHour
                      ).map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))
                      :
                      times.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))
                  }
                </select>
              </div>
              <button type="submit">Записаться</button>
            </>
        }
      </form>
    </div>
  )

}
export default Modal
