import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Record from '../../components/Record/Record';
import { getRecords } from '../../redux/slices/recordSlice';
import { useNavigate } from 'react-router-dom';

function AdminPage()
{
    const dispatch = useDispatch()
    const { records, error, loading } = useSelector(state => state.recordsReducer)
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

    function getMonthNumber(monthName)
    {
        const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return monthNames.indexOf(monthName);
    }

    console.log('filltered: ', filteredRecords);
    useEffect(() =>
    {
        dispatch(getRecords())
    }, [])
    return (
        <div>
            <h2>Records</h2>
            <button onClick={() => navigate(-1)}>Выйти</button>
            {
                loading ? <p>loading...</p>
                    :
                    error ? <h3>{error}</h3>
                        :
                        records.filter(el => el.type === 1).map(r => <Record key={r.id} data={r} />)
            }
        </div>
    )
}

export default AdminPage