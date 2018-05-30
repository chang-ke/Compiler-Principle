import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Lexical from './Lexical';
import LL from './LL';

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-satrt' }}>
      <Link to="/lexical" style={{ width: '33%' }}>
        lexical
      </Link>
      <Link to="/ll" style={{ width: '33%' }}>ll</Link>
    </div>
  );
};

const Routers = () => (
  <Router>
    <div>
      <Route path="/" component={Home} />
      <Route path="/lexical" component={Lexical} />
      <Route path="/ll" component={LL} />
    </div>
  </Router>
);

ReactDOM.render(<Routers />, document.getElementById('root'));
