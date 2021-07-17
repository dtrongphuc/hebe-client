import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'components/Routes';
import store from './app/store';
import { Provider } from 'react-redux';
import './index.scss';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import ModalLoading from 'components/ModalLoading/ModalLoading';

let persistor = persistStore(store);
document.title = 'Hebe Boutique - Hebe designer boutique';
ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={<ModalLoading />} persistor={persistor}>
			<Routes />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
