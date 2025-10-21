import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AdMob } from '@capacitor-community/admob';

// Initialiser AdMob
AdMob.initialize({
  initializeForTesting: true,
}).then(() => {
  console.log('✅ AdMob initialisé');
}).catch((error) => {
  console.error('❌ Erreur AdMob:', error);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)