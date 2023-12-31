import logo from './logo.svg';
import './App.css';
import WorldClock from './WorldClock';
import CookieDisclaimer from './CookieDisclaimer';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

const App = () => {
  useEffect(() => {
    ReactGA.initialize('G-C8Q26L8672'); // Replace with your Google Analytics tracking ID
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>World Clock</h1>
        <WorldClock />
      </header>
      <CookieDisclaimer />
    </div>
  );
};


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>World Clock</h1>
//         <WorldClock />
//       </header>
//     </div>
//   );
// }

export default App;
