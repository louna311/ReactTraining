// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import TodoList from './components/TodoList'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { todosContext } from './components/contexts/todosContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: ['Marhey'],
  },
  palette: {
    primary: {
      main: "#9A3F3F"
    }
  }
});

const initialTodos = [
  {
    id: uuidv4(),
    title: 'قراءة كتاب',
    details: 'قراءة كتاب عن تطوير الذات',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'قراءة كتاب',
    details: 'قراءة كتاب عن تطوير الذات',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'قراءة كتاب',
    details: 'قراءة كتاب عن تطوير الذات',
    isCompleted: false,
  }
];


function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div className="App"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#191b1f',
          height: '100vh',
          direction: 'rtl',
        }}>
        <todosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </todosContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App
