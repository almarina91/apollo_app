import './App.css';
import React from 'react';
import Header from "./features/Header";
import ItemsList from "./features/ItemsList";

function App() {
  return (
    <div className="App">
        <Header/>
        <ItemsList />
    </div>
  );
}

export default App;
