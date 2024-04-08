import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, RegisterPage, NotFoundPage, HomePage } from '#pages';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AnonPage from './pages/Landing/landing';

function App() {
    // we can change this later, just setting it up for now
    const theme = createTheme({
        palette: {
            primary: {
                main: '#46AD8D',
                contrastText: '#fff' //button text white instead of black
            },
            background: {
                default: '#394764'
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<AnonPage />} />
                    <Route path='/home' exact element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/not-found' element={<NotFoundPage />} />
                    <Route path='/*' element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
