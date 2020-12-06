import React, { useContext } from 'react';
import './App.css';
import './scss/main.scss';
import Header from './components/header';
import Main from './components/main';
import { ThemeContext } from './context/theme-context';
import { ToDoProvider } from './context/todos-context';
import { ToDoCopyProvider } from './context/todos-copy-context';

function App() {
  const [LightTheme] = useContext(ThemeContext)

  return (
    <div className={LightTheme ? "App" : 'App dark'}>
      <ToDoCopyProvider>
        <ToDoProvider>
          <Header />
          <Main />
        </ToDoProvider>
      </ToDoCopyProvider>

    </div >
  );
}

export default App;
