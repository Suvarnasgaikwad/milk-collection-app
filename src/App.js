import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from  'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FarmerList from './components/FarmerList';
import HomePage from './pages/HomePage';
import AddFarmer from './components/AddFarmer';
import About from './pages/About';
import Edit from './components/Edit';

function App() {
  return (
  <div className="App">
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/farmers" component={AddFarmer} />
      <Route path="/about" component={About} />
     <Route path="/farmerslist" component={FarmerList} /> 
     <Route path="/update" render={() => <Edit title="1" />} />
    </Switch>
    <Footer />
  </Router>
  </div>
);
}
export default App;
