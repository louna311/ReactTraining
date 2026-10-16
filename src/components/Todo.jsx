import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useState } from 'react';
import { todosContext } from './contexts/todosContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function Todo({ todo }) {

    const [showDltDialog, setShowDltDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState({ title: todo.title, details: todo.details });
    const { todos, setTodos } = useContext(todosContext);


    function handleCheckCLick() {
        const updatedTodos = todos.map((t) => {
            if (t.id == todo.id) {
                t.isCompleted = !t.isCompleted;
            }
            return t;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    function handleDeleteClick() {
        setShowDltDialog(true);
    };

    function handleUpdateClick() {
        setShowUpdateDialog(true);
    }

    function handleDeleteDialogClose() {
        setShowDltDialog(false);
    };

    function handleUpdateClose() {
        setShowUpdateDialog(false);
    };

    function handleDeleteConfirm() {
        const updatedTodos = todos.filter((t) => {
            return t.id != todo.id
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    function handleUpdateConfirm() {
        const updatedTodos = todos.map((t) => {
            if (t.id == todo.id) {
                return { ...t, title: updatedTodo.title, details: updatedTodo.details }
            }
            else {
                return t;
            }
        })
        setTodos(updatedTodos);
        setShowUpdateDialog(false);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };


    return (
        <>
            {/* delete modal */}
            <Dialog
                sx={{ direction: 'rtl' }}
                onClose={handleDeleteDialogClose
                }
                open={showDltDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
            >
                <DialogTitle id="alert-dialog-title">
                    هل أنت متأكد من حذف هذه المهمة؟
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        لا يمكنك التراجع عن الحذف بعد إتمامه
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDeleteDialogClose
                        }>
                        إغلاق
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}>
                        نعم قم بالحذف
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ====delete modal==== */}

            {/* update dialog */}
            <Dialog
                sx={{ direction: 'rtl' }}
                onClose={handleUpdateClose}
                open={showUpdateDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
            >
                <DialogTitle id="alert-dialog-title">
                    تعديل المهمة
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="عنوان المهمة"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.title}
                        onChange={(e) => {
                            setUpdatedTodo({ ...updatedTodo, title: e.target.value })
                        }}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="التفاصيل"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.details}
                        onChange={(e) => {
                            setUpdatedTodo({ ...updatedTodo, details: e.target.value })
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleUpdateClose}>
                        إغلاق
                    </Button>
                    <Button
                        onClick={handleUpdateConfirm}>
                        تأكيد
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ===update dialog=== */}

            <Card className='todoCard'
                sx={{ minWidth: 275, background: '#C1856D', color: 'white', marginTop: '5px' }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={8}>

                            <Typography variant='h5'
                                sx={{ textAlign: 'right', textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                                {todo.title}
                            </Typography>

                            <Typography variant='h6'
                                sx={{ textAlign: 'right' }}>
                                {todo.details}
                            </Typography>

                        </Grid>
                        <Grid size={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>

                            {/* check icon */}
                            <IconButton
                                onClick={() => {
                                    handleCheckCLick();
                                }}
                                className='iconBtn'
                                aria-label='check'
                                sx={{
                                    color: todo.isCompleted ? 'white' : '#8bc34a',
                                    background: todo.isCompleted ? '#8bc34a' : 'white',
                                    border: 'solid #8bc34a 3px',
                                }}>
                                <CheckIcon />
                            </IconButton>
                            {/*=== check icon === */}

                            {/* update button */}
                            <IconButton
                                onClick={handleUpdateClick}
                                className='iconBtn'
                                aria-label='edit'
                                sx={{
                                    color: '#5e7ae0',
                                    background: 'white',
                                    border: 'solid #5e7ae0 3px'
                                }}>
                                <EditIcon />
                            </IconButton>
                            {/* ===update button=== */}

                            {/* delete button */}
                            <IconButton className='iconBtn'
                                aria-label='delete'
                                sx={{
                                    color: '#b02d2d',
                                    background: 'white',
                                    border: 'solid #b02d2d 3px'
                                }}
                                onClick={handleDeleteClick}
                            >
                                <DeleteIcon />
                            </IconButton>
                            {/* delete button */}

                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </>
    );
}