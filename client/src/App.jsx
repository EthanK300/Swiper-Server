import logo from './assets/swiperlogobetter.png';

function Greet(prop) {
  return (<h1>{prop.name} xd</h1>);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Greet name="ethan" />
    </div>
  );
}

export default App;
