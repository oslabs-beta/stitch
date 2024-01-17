import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { persistor, store } from './store/store';
import { Provider } from 'react-redux';
import './assets/css/style.css';
import { PersistGate } from 'redux-persist/integration/react';
var root = createRoot(document.getElementById('app'));
root.render(React.createElement(Provider, { store: store },
    React.createElement(App, null)));
//# sourceMappingURL=index.js.map