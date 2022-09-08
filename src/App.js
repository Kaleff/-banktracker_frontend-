import logo from './logo.svg';
import './App.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import CurrencyList from './components/CurrencyList';
import { Outlet, Link } from 
'react-router-dom';

function App() {
  return (
    <>
    <header>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/rates/1'>Rates</Link>
      </nav>
    </header>
    <Outlet />
    </>
  );
}

export default App;
