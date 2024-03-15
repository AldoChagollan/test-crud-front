import logo from './logo.svg';
import './App.css';
import CrudTest from './Crud';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CrudTest />
      </header>
    </div>
  );
}

export default App;
