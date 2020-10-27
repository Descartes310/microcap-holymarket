/**
* Main App
*/
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { AbilityContext } from './permissions/Can';

// css
import './lib/reactifyCss';

// firebase
import './firebase';

// app component
import App from './container/App';

import store, { configureStore } from './store';

import ability from './permissions/ability';

const MainApp = () => (
	<Provider store={store}>
		<AbilityContext.Provider value={ability}>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<App />
			</MuiPickersUtilsProvider>
		</AbilityContext.Provider>
	</Provider>
);

export default MainApp;
