import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Record from '../../components/Record/Record';
import { getRecords } from '../../redux/slices/recordSlice';
import { useNavigate } from 'react-router-dom';
import Review from '../../components/Review/Review';
import { outAdmin } from '../../redux/slices/adminSlice';
import ReviewAdmin from '../../components/ReviewAdmin/ReviewAdmin';

function AdminPage()
{
    const [choice, setChoice] = useState(0)
    const dispatch = useDispatch()
    const { records, error, loading } = useSelector(state => state.recordsReducer)
    const { valid } = useSelector(state => state.adminReducer)
    console.log('records ', records);
    const navigate = useNavigate()
    const today = new Date()
    const filteredRecords = records.filter(record =>
    {
        if (!record.date) return false;
        const [day, month] = record.date.split(' ');
        const monthNum = getMonthNumber(month);
        const year = today.getFullYear();
        const recordDate = new Date(year, monthNum, day);
        return recordDate > today;
    });
    const review = records.filter(record => record.type === 2)
    const allRecords = records.filter(record => record.type === 1)
    function getMonthNumber(monthName)
    {
        const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return monthNames.indexOf(monthName);
    }

    const data = [filteredRecords, allRecords, review]
    useEffect(() =>
    {
        dispatch(getRecords())
    }, [])

    // sort 
    const months = {
        'января': 0,
        'февраля': 1,
        'марта': 2,
        'апреля': 3,
        'мая': 4,
        'июня': 5,
        'июля': 6,
        'августа': 7,
        'сентября': 8,
        'октября': 9,
        'ноября': 10,
        'декабря': 11,
    };

    const parseDate = (dateStr) =>
    {
        const [day, month] = dateStr.split(' ');
        const monthIndex = months[month];
        return new Date(new Date().getFullYear(), monthIndex, day);
    };
    allRecords.sort(function (a, b)
    {
        // Сравниваем даты
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        if (dateA < dateB) {
            return -1;
        } else if (dateA > dateB) {
            return 1;
        } else {
            // Если даты равны, сравниваем время
            if (a.time < b.time) {
                return -1;
            } else if (a.time > b.time) {
                return 1;
            } else {
                return 0;
            }
        }
    });
    filteredRecords.sort(function (a, b)
    {
        // Сравниваем даты
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        if (dateA < dateB) {
            return -1;
        } else if (dateA > dateB) {
            return 1;
        } else {
            // Если даты равны, сравниваем время
            if (a.time < b.time) {
                return -1;
            } else if (a.time > b.time) {
                return 1;
            } else {
                return 0;
            }
        }
    });
    if (valid) return (
        <div>
            <h2> Администратор</h2 >
            <button onClick={() =>
            {
                dispatch(outAdmin())
                navigate('/')
            }}>Выйти</button>

            <div>
                <button onClick={() => { setChoice(0) }}>Актуальные Записи</button>
                <button onClick={() => { setChoice(1) }}>Все записи</button>
                <button onClick={() => { setChoice(2) }}>Отзывы</button>
            </div>
            {
                loading ? <p>loading...</p>
                    :
                    error ? <h3>{error}</h3>
                        :
                        choice === 2 ? data[choice].map(r => <ReviewAdmin key={r.id} data={r} />)
                            :
                            data[choice].map(r => <Record key={r.id} data={r} />)

            }
        </div >

    )
    else return (
        <div>
            <h2>Вы должны войти как администратор</h2>
            <button onClick={() => navigate('/')}>Выйти</button>
        </div>
    )
}

export default AdminPage