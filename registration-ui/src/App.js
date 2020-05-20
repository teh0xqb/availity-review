import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { Register } from './Register';

function App() {
  return (
      <div className="App">
          <Router>
              <main className="page">
                  <aside className="banner">
                  </aside>
                  <section className="registration-form">
                      <Register />
                  </section>
              </main>
          </Router>
      </div>
  );
}

export default App;
