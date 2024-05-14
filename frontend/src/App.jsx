import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    AuthorisedPageShell,
    AnonPageShell,
    LoginPage,
    RegisterPage,
    NotFoundPage,
    HomePage,
    CataloguePage,
    ProductsPage,
    CatalogueDetailPage,
    AnonPage,
    AccountPage,
    AccessLogsPage,
    CartPage,
    CheckoutPage
} from '#pages';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CartProvider } from './contexts/CartContext';

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
            <CartProvider>
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
                            path='/catalogue'
                            element={
                                <AnonPageShell>
                                    <CataloguePage />
                                </AnonPageShell>
                            }
                        />
                        <Route
                            path='/catalogue/:catalogueId'
                            element={
                                <AuthorisedPageShell>
                                    <CatalogueDetailPage />
                                </AuthorisedPageShell>
                            }
                        />
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
                        <Route
                            path='/accesslogs'
                            element={
                                <AuthorisedPageShell>
                                    <AccessLogsPage />
                                </AuthorisedPageShell>
                            }
                        />
                        <Route
                            path='/cart'
                            element={
                                <AnonPageShell>
                                    <CartPage />
                                </AnonPageShell>
                            }
                        />
                        <Route
                            path='/checkout'
                            element={
                                <AnonPageShell>
                                    <CheckoutPage />
                                </AnonPageShell>
                            }
                        />
                        <Route path='/not-found' element={<NotFoundPage />} />
                        <Route path='/*' element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </ThemeProvider>
    );
}
