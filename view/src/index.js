import react from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Lexical from './Lexical';
const Routers = () => (
  <Router>
    <Route path="/" component={Lexical} />
  </Router>
);

ReactDOM.render(<Routers />, document.getElementById('root'));
