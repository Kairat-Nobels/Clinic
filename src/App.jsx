import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import ServicePage from './pages/ServicePage/ServicePage'
import DoctorsPage from './pages/DoctorsPage/DoctorsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ServiceAboutPage from './pages/ServiceAboutPage/ServiceAboutPage'
import AdminPage from './pages/AdminPage/AdminPage'

function App()
{

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path={'/services'} element={<ServicePage />} />
                        <Route path={'/doctors'} element={<DoctorsPage />} />
                        <Route path={'/services/:id'} element={<ServiceAboutPage />} />
                        <Route path={'*'} element={<NotFoundPage />} />
                    </Route>
                    <Route path={'/admin'} element={<AdminPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
