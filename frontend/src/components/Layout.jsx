import { Card, CardActions, CardContent, Typography } from '@mui/material';

export default function Layout({
    title,
    headerContent,
    headerActions,
    children
}) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                marginTop: '4rem',
                justifyContent: 'space-between',
                padding: '2rem' // ensure some padding on narrow screens
            }}
        >
            <Typography variant='h2' gutterBottom>
                {title}
            </Typography>

            <Card sx={{ marginBottom: '4rem' }}>
                <CardContent>{headerContent}</CardContent>
                {headerActions && <CardActions>{headerActions}</CardActions>}
            </Card>

            {children}
        </div>
    );
}
