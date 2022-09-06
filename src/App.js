import logo from './logo.svg';
import './App.css';
import CurrencyList from './components/CurrencyList';
import { Outlet, Link } from 
'react-router-dom';

function App() {
  return (
    <>
    <nav>
      <Link to='/rates'>Rates</Link>
    </nav>
    <Outlet />
    </>
  );
}

export default App;
