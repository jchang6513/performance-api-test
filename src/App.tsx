import logo from './logo.svg';
import './App.css';
import { usePerfTiming } from './usePerfTiming';
import { useEffect, useState } from 'react';

function App() {
  const timing = usePerfTiming()

  console.log(timing)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, Math.random() * 1000)
  }, [])

  if (loading) return null

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
    </div>
  );
}

export default App;
