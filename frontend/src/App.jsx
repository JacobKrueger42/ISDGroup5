import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank'>
                    <img
                        src={reactLogo}
                        className='logo react'
                        alt='React logo'
                    />
                </a>
            </div>
            <Card sx={{ minWidth: 500 }} variant='outlined'>
                <CardHeader title='Vite + React' />
                <CardContent>
                    <Typography variant='body1'>
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant='contained'
                        size='medium'
                        color='secondary'
                        onClick={() => setCount(count => count + 1)}
                    >
                        count is now this {count}
                    </Button>
                </CardActions>
            </Card>
            <p className='read-the-docs'>
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
