import logo from './logo.svg';
import './App.css';


function greet(prompt) {
  return (<h1>{prompt.name} xd</h1>);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <greet name="ethan" />
    </div>
  );
}

export default greet;
