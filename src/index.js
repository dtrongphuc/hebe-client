import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'components/Routes';
import store from './app/store';
import { Provider } from 'react-redux';
import './index.scss';

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root')
);
