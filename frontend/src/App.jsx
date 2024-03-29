import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, RegisterPage, NotFoundPage } from '#pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/not-found' element={<NotFoundPage />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
