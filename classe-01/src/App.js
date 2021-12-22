import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [paises, setPaises] = useState([]);
  const [country, setCountry] = useState('');
  const [screen, setScreen] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3/all')
      .then(resposta => resposta.json())
      .then(dados => {
        setPaises(dados);
        setScreen(dados);
        console.log(dados)
      })
  }, []);

  useEffect(() => {
    const search = paises.filter(pais => pais.name.common.toLowerCase().includes(country.toLowerCase()));
    (search && country) ? setScreen(search) : setScreen(paises);
    // eslint-disable-next-line
  }, [country])

  return (
    <div className="App">
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <p>Total Countries: {screen.length}</p>
      <div className="display">
      {screen.map(pais => (
        <div className="card" key={pais.name.official}>
          <h1>{pais.flag}{pais.name.common}</h1>
          <img
            className="flag"
            src={pais.flags[0]}
            alt={pais.name.common}
          />
        
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
