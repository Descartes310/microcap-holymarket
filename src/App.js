/**
* Main App
*/
import React from 'react';
import  { useEffect } from 'react';
import { Provider } from 'react-redux';
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

import store from './store';

import ability from './permissions/ability';
import {getSessonId} from "Helpers/helpers";
import { ParallaxProvider } from 'react-scroll-parallax';
import { SWRConfig } from 'swr';
import { makeRequest } from 'Helpers/helpers';
// Set session id if it doest not exits
getSessonId();


const SWR_CONFIG = {
	shouldRetryOnError: false,
	errorRetryCount: 3,	// max error retry count
	fetcher: url => makeRequest('get', url)
};


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
						<SWRConfig value={SWR_CONFIG}>
					    	<App />
						</SWRConfig>
                    </ParallaxProvider>
				</MuiPickersUtilsProvider>
			</AbilityContext.Provider>
		</Provider>
	)
};

export default MainApp;

