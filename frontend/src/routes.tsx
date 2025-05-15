import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

export const RoutesPages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};
