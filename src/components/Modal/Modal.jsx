import React, { useEffect, useState } from 'react';
import styles from './modal.module.css';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createRecord, getRecords } from '../../redux/slices/recordSlice';
import SpinnerModal from '../SpinnerModal/SpinnerModal';

const Modal = ({ setModal, data }) => {
  const [result, setResult] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const dispatch = useDispatch();
  const { error, loading, success, records } = useSelector(state => state.recordsReducer);

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

  const [times, setTimes] = useState([]);
  const currentHour = today.getHours() + 1;
  const startHour = 9;
  const endHour = 18;

  const filterAvailableTimes = (allTimes, date, service) => {
    return allTimes.filter(time => {
      return !records.some(record =>
        record.date === date &&
        record.time === time &&
        record.service === service
      );
    });
  };

  const generateTimes = (date = selectedDate, service = selectedService) => {
    let arr = [];
    for (let hour = startHour; hour < endHour; hour++) {
      arr.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    const filtered = filterAvailableTimes(arr, date, service);
    setTimes(filtered);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    dispatch(getRecords());
    return () => (document.body.style.overflow = '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(true);
    dispatch(createRecord({ name, phone, service: selectedService, date: selectedDate, time: selectedTime }));
  };

  const handlePhoneNumberChange = (event) => {
    let input = event.target.value.replace(/\D/g, '');
    if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
      setIsValid(false);
      setPhone(input);
      return;
    }
    input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3');
    setIsValid(/^\(\d{3}\)-\d{3}-\d{3}$/.test(input));
    setPhone(input);
  };

  const closeModal = (e) => {
    if (!document.querySelector('form').contains(e.target) && !result) {
      document.body.style.overflow = '';
      setModal(false);
    }
  };

  const handleClose = () => {
    document.body.style.overflow = '';
    setModal(false);
  };

  return (
    <div onClick={closeModal} className={styles.window}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>Запись на приём</h2>
        <section onClick={handleClose} className={styles.closeX}>X</section>

        {result ? (
          loading ? (
            <div className={styles.loading}>
              <SpinnerModal />
              <p>Идёт запись...</p>
            </div>
          ) : (
            <div>
              <button type='button' className={styles.closeBtn} onClick={handleClose}>X</button>
              {error ? <ErrorMessage message={error} /> : <SuccessMessage message={success} />}
            </div>
          )
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="name">Имя: </label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Телефон: </label>
              <input type="tel" placeholder="777222333" id="phone" value={phone} onChange={handlePhoneNumberChange} required />
              {!isValid && phone.length > 0 && <p className='errorNum'>Номер телефона введен неправильно</p>}
            </div>

            <div className='form-group'>
              <label htmlFor="service">Услуга: </label>
              <select
                id='service'
                required
                value={selectedService}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedService(value);
                  generateTimes(selectedDate, value);
                  setSelectedDate('');
                  setSelectedTime('');
                }}
              >
                <option value=''>Выберите услугу</option>
                {data.categories.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Дата: </label>
              <select
                id="date"
                value={selectedDate}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedDate(value);
                  generateTimes(value, selectedService);
                  setSelectedTime('');
                }}
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
              <select
                disabled={!selectedDate}
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="" disabled>Выберите время</option>
                {(
                  selectedDate && selectedDate.slice(0, 2) === today.getDate().toString()
                    ? times.filter(time => Number(time.slice(0, 2)) >= currentHour)
                    : times
                ).map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <button disabled={!isValid} type="submit">Записаться</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Modal;
