import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, RegisterPage, NotFoundPage, HomePage } from '#pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/not-found' element={<NotFoundPage />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
