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
  const [isValid, setIsValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const dispatch = useDispatch()
  const { error, loading, success, records } = useSelector(state => state.recordsReducer)
  let fillterRecords = records.filter(r => r.type === 1)
  console.log(fillterRecords);
  let act = 0;
  if (data.name === "Кардиология") act = 1;
  else if (data.name === "Дерматология") act = 2;
  else if (data.name === "Терапия") act = 3;

  // даты 
  const today = new Date();
  console.log('today: ' + today.getDate());
  const dates = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
    const dateString = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
    const dayOfWeek = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' }).format(date);
    if (dayOfWeek !== 'воскресенье') {
      dates.push({ date: dateString, dayOfWeek });
    }
  }

  const [times, setTimes] = useState([])
  const currentHour = today.getHours() + 1;

  const startHour = 9;
  const endHour = 18;
  const addTime = (data, data1) =>
  {
    let arr = []
    for (let hour = startHour; hour < endHour; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      arr.push(time);
    }
    setTimes(arr)
    check(data, arr, data1)
  }

  const check = (data, arr, data1) =>
  {
    const arr1 = arr;
    for (const rTime of fillterRecords) {
      for (const time of arr1) {
        if (act === 0) {
          if (rTime.time === time && rTime.date == data && rTime.service == (data1 || selectedService)) {
            let i = arr1.indexOf(time);
            arr1.splice(i, 1);
          }
        }
        else if (act === 1) {
          if (rTime.time === time && rTime.date == data) {
            if (rTime.service === 'Приём (осмотр, консультация)' || rTime.service === 'Приём детского врача-кардиолога' || rTime.service === 'ЭКГ с расшифровкой') {
              let i = arr1.indexOf(time);
              arr1.splice(i, 1);
            }
          }
        }
        else if (act === 2) {
          if (rTime.time === time && rTime.date == data) {
            if (rTime.service === 'Консультация дерматокосметолог' || rTime.service === 'Чистка лица (аппаратная и ручная)' || rTime.service === 'Пилинги' || rTime.service === 'Дермапен') {
              let i = arr1.indexOf(time);
              arr1.splice(i, 1);
            }
          }
        }
        else if (act === 3) {
          if (rTime.time === time && rTime.date == data) {
            if (rTime.service === 'Консультация гепатолога' || rTime.service === 'Консультация терапевта') {
              let i = arr1.indexOf(time);
              arr1.splice(i, 1);
            }
          }
        }
      }
    }
    setTimes(arr1);
  }
  // ---
  const body = document.body;
  const handleSubmit = (e) =>
  {
    e.preventDefault();
    setResult(true)
    const rec = {
      type: 1,
      name: name,
      phone: phone,
      service: selectedService,
      date: selectedDate,
      time: selectedTime
    }
    dispatch(createRecord(rec))

  };
  const handlePhoneNumberChange = (event) =>
  {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
      setIsValid(false);
      setPhone(input);
      return;
    }
    input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3');
    setIsValid(/^\(\d{3}\)-\d{3}-\d{3}$/.test(input));
    setPhone(input);
  };
  useEffect(() =>
  {
    body.style.overflow = 'hidden';
    addTime()
    dispatch(getRecords())
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
              <div>
                <button type='button' className={styles.closeBtn} onClick={() =>
                {
                  body.style.overflow = '';
                  setModal(false)
                  setResult(false)
                }}>X</button>
                {
                  error ? <ErrorMessage message={error} />
                    : <SuccessMessage message={success} />
                }
              </div>
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
                  placeholder="777222333"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneNumberChange}
                  required
                />
                {isValid ? (
                  <p>Номер телефона введен правильно</p>
                ) : (
                  phone.length > 0 && <p>Номер телефона введен неправильно</p>
                )}
              </div>
              <div className='from-group'>
                <label htmlFor="time">Услуга: </label>
                <select id='service' required value={selectedService} onChange={(e) =>
                {
                  setSelectedService(e.target.value)
                  addTime(selectedDate, e.target.value)
                  setSelectedDate('')
                  setSelectedTime('')
                }}>
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
                  onChange={(e) =>
                  {
                    setSelectedDate(e.target.value)
                    addTime(e.target.value, selectedService)
                    setSelectedTime('')
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
                <select disabled={selectedDate.length > 0 ? false : true} id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
                  <option value="" disabled>Выберите время</option>
                  {
                    today.getDate().toString() === selectedDate.slice(0, 2) ?
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
              <button disabled={isValid ? false : true} type="submit">Записаться</button>
            </>
        }
      </form>
    </div>
  )

}
export default Modal
