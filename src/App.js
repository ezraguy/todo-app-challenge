import React from 'react';
import './App.css';
import './scss/main.scss';
import Header from './components/header';
import Main from './components/main';
import { ToDoProvider } from './context/todos-context';
import { ToDoCopyProvider } from './context/todos-copy-context';
import Background from './components/background';

function App() {

  return (
    <div className="App">
      <Background />
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
