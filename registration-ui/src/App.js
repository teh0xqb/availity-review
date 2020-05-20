import React from 'react';
/* import logo from './logo.svg'; */
import './App.css';
import { Register } from './Register';

function App() {
  return (
    <div className="App">
      <main className="page">
          <aside className="banner">
          </aside>
          <section className="registration-form">
              <Register />
          </section>
      </main>
    </div>
  );
}

export default App;
