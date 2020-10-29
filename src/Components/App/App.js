import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from '../Utilities/Header/Header';
import Footer from '../Utilities/Footer/Footer';
import Home from '../Pages/Home/Home';
import Quiz from '../Pages/Quiz/Quiz';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/quiz" component={ Quiz } />
            {/* <Route component={ Default } /> */}
          </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
