import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { persistor, store } from './store/store';
import { Provider } from 'react-redux';
import './assets/css/style.css';
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
