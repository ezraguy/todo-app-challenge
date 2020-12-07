import React from 'react';
import './App.css';
import './scss/main.scss';
import Header from './components/header';
import Main from './components/main';
import { ToDoProvider } from './context/todos-context';
import Background from './components/background';

function App() {
  return (
    <div className="App">
      <Background />
      <ToDoProvider>
        <Header />
        <Main />
      </ToDoProvider>
    </div >
  );
}

export default App;
