import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    AuthorisedPageShell,
    AnonPageShell,
    LoginPage,
    RegisterPage,
    NotFoundPage,
    HomePage,
    ProductsPage,
    AnonPage,
    AccountPage
} from '#pages';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function App() {
    // we can change this later, just setting it up for now
    const theme = createTheme({
        palette: {
            primary: {
                main: '#46AD8D',
                contrastText: '#E7FAF3' //button text white instead of black
            },
            background: {
                default: '#394764',
                paper: '#E7FAF3'
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        exact
                        element={
                            <AnonPageShell>
                                <AnonPage />
                            </AnonPageShell>
                        }
                    />
                    <Route
                        path='/home'
                        exact
                        element={
                            <AuthorisedPageShell>
                                <HomePage />
                            </AuthorisedPageShell>
                        }
                    />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route
                        path='/products'
                        element={
                            <AuthorisedPageShell>
                                <ProductsPage />
                            </AuthorisedPageShell>
                        }
                    />
                           <Route
                        path='/account'
                        element={
                            <AuthorisedPageShell>
                                <AccountPage />
                            </AuthorisedPageShell>
                        }
                    />
                    <Route path='/not-found' element={<NotFoundPage />} />
                    <Route path='/*' element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
