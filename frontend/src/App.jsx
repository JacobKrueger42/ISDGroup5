import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './Register/register.jsx';
import LoginPage from './Login/login.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
