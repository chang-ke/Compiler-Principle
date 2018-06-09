import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Lexical from './Lexical';
import LL from './LL';
import LR from './LR';

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <Link to="/lexical">lexical</Link>
      <Link to="/ll">ll</Link>
      <Link to="/lr">lr</Link>
    </div>
  );
};

const Routers = () => (
  <Router>
    <div>
      <Route path="/" component={Home} />
      <Route path="/lexical" component={Lexical} />
      <Route path="/ll" component={LL} />
      <Route path="/lr" component={LR} />
    </div>
  </Router>
);

ReactDOM.render(<Routers />, document.getElementById('root'));
