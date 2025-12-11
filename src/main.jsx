import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'   // keep your existing App.js
import { HashRouter } from "react-router-dom";
import { MusicProvider } from './components/context/MusicCont.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
            
    
  </React.StrictMode>
)
