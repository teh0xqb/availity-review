import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { Register } from './Register';

/**
 * Main application entrypoint, to registration form only (harcoded as only route).
 * This component is responsible for creating the skeleton for the layout of its children.
 * That is, child component themselves are not aware of the display style nor settings they could set,
 * hence the need for additional aside/section "wrappers".
 **/
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
