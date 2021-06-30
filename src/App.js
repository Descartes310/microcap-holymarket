/**
* Main App
*/
import React from 'react';
import  { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { AbilityContext } from './permissions/Can';
import "aos/dist/aos.css";

// animation
import AOS from 'aos';
// css
import './lib/reactifyCss';
import 'react-image-lightbox/style.css';

// firebase
import './firebase';

// app component
import App from './container/App';

import store, { configureStore } from './store';

import ability from './permissions/ability';
import {getSessonId} from "Helpers/helpers";
import { ParallaxProvider } from 'react-scroll-parallax';

// Set session id if it doest not exits
getSessonId();

const MainApp = () => {

	useEffect(()=>{
		AOS.init({
			// duration: 2000
            duration: 2000,
            easing: 'slide',
            once: true
		});
	}, []);

	return(
		<Provider store={store}>
			<AbilityContext.Provider value={ability}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
                    <ParallaxProvider>
					    <App />
                    </ParallaxProvider>
				</MuiPickersUtilsProvider>
			</AbilityContext.Provider>
		</Provider>
	)
};

export default MainApp;
