import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './assets/css/style.css';

const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
