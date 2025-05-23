import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import './index.css';

console.log('import.meta.env.VITE_API_URL',import.meta.env.VITE_API_URL)
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['Accept'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
