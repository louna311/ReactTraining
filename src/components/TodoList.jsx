// import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Todo from './Todo';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { todosContext } from './contexts/todosContext';
import { v4 as uuidv4 } from 'uuid';


export default function TodoList() {
    const { todos, setTodos } = useContext(todosContext);

    const [titleInput, setTitleInput] = useState('');
    const [displayedTodosType, setDisplayedTodosType] = useState("all");

    //filteration arrays
    const completedTodos = todos.filter((t) => {
        return t.isCompleted;
    });

    const notCompletedTodos = todos.filter((t) => {
        return !t.isCompleted;
    });

    let todosToBeRendered = todos;
    if (displayedTodosType == "completed") {
        todosToBeRendered = completedTodos;
    }
    else if (displayedTodosType == "non-completed") {
        todosToBeRendered = notCompletedTodos;
    }
    else {
        todosToBeRendered = todos;
    }

    const todosJsx = todosToBeRendered.map((t) => {
        return <Todo key={t.id} todo={t} />
    });


    useEffect(() => {
        console.log("calling use effect");
        const storageTodos = JSON.parse(localStorage.getItem("todos"));
        setTodos(storageTodos);
    }, []);

    function changeDisplayedType(e) {
        setDisplayedTodosType(e.target.value);
    };

    function handlAddClick() {
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            details: "",
            isCompleted: false,
        };

        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTitleInput('');
    };


    return (
        <Container maxWidth="sm"
            style={{ textAlign: 'center' }}>
            <Card sx={{ minWidth: 275 }}
                style={{
                    maxHeight: '80vh',
                    overflow: 'scroll'
                }}>
                <CardContent>
                    <Typography variant='h2'
                        sx={{ fontWeight: 'bold' }}>
                        مهامي
                    </Typography>
                    <Divider />

                    <ToggleButtonGroup
                        style={{ direction: 'ltr', marginTop: '30px' }}
                        color="primary"
                        value={displayedTodosType}
                        exclusive
                        onChange={changeDisplayedType}
                        aria-label="Platform"
                    >
                        <ToggleButton value="non-completed">غير المنجز</ToggleButton>
                        <ToggleButton value="completed">المنجز</ToggleButton>
                        <ToggleButton value="all">الكل</ToggleButton>
                    </ToggleButtonGroup>

                    {todosJsx}

                    <Grid container
                        sx={{ marginTop: '20px' }}
                        spacing={2}>
                        <Grid size={8}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                            <TextField id="outlined-basic"
                                label="عنوان المهمة"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={titleInput}
                                onChange={(e) => {
                                    setTitleInput(e.target.value);
                                }} />

                        </Grid>

                        <Grid size={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                            <Button variant="contained"
                                color='primary'
                                onClick={() => {
                                    handlAddClick();
                                }}
                                sx={{ width: '100%', height: '100%', }}
                                disabled={titleInput.length == 0}>
                                إضافة
                            </Button>
                        </Grid>
                    </Grid>

                </CardContent>

            </Card>
        </Container>
    );
}
