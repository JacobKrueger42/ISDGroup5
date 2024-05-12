import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function InfoDialogue({ open, onClose, title, upc, quantity }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title ?? 'Product'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Unique Product Code (UPC): {upc ?? '<unknown>'}
                </DialogContentText>
                <DialogContentText>
                    Current Stock Level: {quantity ?? '<unknown>'}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
