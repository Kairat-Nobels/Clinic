import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
    name: 'servicesSlice',
    initialState: {
        services: [
            {
                id: 1,
                name: 'Диагностика',
                img: 'https://nd-clinic.ru/kcfinder/upload/images/49663780.jpg',
                categories: [{ name: 'Узи', price: 1500 }, { name: 'Рентген', price: 800 }, { name: 'Гастроскопия', price: 1300 }],
                doctors: [{ name: 'Асанов Асан', post: 'Врач УЗИ' }, { name: 'Валерий Карпов', post: 'Эндоскопист' }, { name: 'Раимбеков Аманкелди', post: 'Ренгенолог' }]
            },
            {
                id: 2,
                name: 'Терапия',
                img: 'https://static.tildacdn.com/tild6165-3464-4330-b162-623666623566/_.jpg',
                categories: [{ name: 'Консультация гепатолога', price: 1000 }, { name: 'Консультация терапевта', price: 800 }, { name: 'ЭКГ с расшифровкой', price: 400 }],
                doctors: [{ name: 'Акаева Аяна', post: 'Терапевт' }]
            },
            {
                id: 3,
                name: 'Кардиология',
                img: 'https://mc-daniel.ru/upload/iblock/214/2145613d52d7e0020eefbfc98f70a553.jpg',
                categories: [{ name: 'Приём (осмотр, консультация)', price: 1200 }, { name: 'Приём детского врача-кардиолога', price: 1000 }, { name: 'ЭКГ с расшифровкой', price: 400 }],
                doctors: [{ name: 'Анастасия Ивановна', post: 'Кардиолог' }]
            },
            {
                id: 4,
                name: 'Гастроэнтерология',
                img: 'https://medhelp53.ru/wp-content/uploads/2022/10/gastroenterologiya.jpg',
                categories: [{ name: 'Приём гастроэнтерелога', price: 1300 }],
                doctors: [{ name: 'Валерий Карпов', post: 'Эндоскопист' }]
            },
            {
                id: 5,
                name: 'Стоматология',
                img: 'https://www.rudenta.ru/upload/sprint.editor/695/v4aq2zp96t2zbysxtmxu9hxzc0rzh0pa/edit_pic.jpg',
                categories: [{ name: 'Лечение кариеса', price: 1200 }, { name: 'Удаление зуба', price: 1000 }, { name: 'Установка брекет системы', price: 12000 }],
                doctors: [{ name: 'Рахманов Азамат', post: 'Стомотолог' }, { name: 'Темиркулова Үмүтай', post: 'Стомотолог' }, { name: 'Умаров Алим', post: 'Стомотолог-Хирург' }]
            },
            {
                id: 6,
                name: 'Дерматология',
                img: 'https://vvclinic.com.ua/images/news/dermatologiya.jpg',
                categories: [{ name: 'Консультация дерматокосметолога', price: 600 }, { name: 'Чистка лица (аппаратная и ручная)', price: 1200 }, { name: 'Пилинги', price: 1000 }, { name: 'Дермапен', price: 2000 }],
                doctors: [{ name: 'Ильязова Раяна', post: 'Дерматолог, Косметолог' }]
            },
        ]
    },
    reducers: {
        servicesInfo: (state, action) =>
        {
            state.services = action.payload;
        }
    }
})
const { servicesInfo } = servicesSlice.actions;
export default servicesSlice.reducer