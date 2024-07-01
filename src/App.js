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
import AddMilkCollection from './components/AddMilkCollection';
import ViewCollection from './components/ViewCollection';
import Settings from './components/Settings';


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
     <Route path="/add-milk-collection" component={AddMilkCollection} /> 
     <Route path="/view-collections" component={ViewCollection} />
     <Route path="/update/:id" render={() => <Edit />} />
     <Route path="/addmilk/:farmId" render={() => <AddMilkCollection />} />
     <Route path="/setting" component={Settings}/>
    </Switch>
    <Footer />
  </Router>
  </div>
);
}
export default App;
