import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Texts from './components/Texts';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <Router>
    <Navbar title="TextAnalyzer"/>
    <div className="container my-3">
    <Routes>
          <Route exact path="/texts" element={<Texts />}/>
          <Route exact path="/" element={<TextForm heading="Text Analyzer" /> }/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;