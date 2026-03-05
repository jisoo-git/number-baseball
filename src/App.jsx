import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Game />
    </div>
  );
}

export default App;