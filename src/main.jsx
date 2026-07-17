import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import './index.scss';
import App from './App.jsx';

/* Bind react-modal to the app root element for accessibility (aria-hidden on background) */
Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
