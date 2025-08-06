/**
 * Footer
 */
import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// app config
import AppConfig from 'Constants/AppConfig';
import { LANDING } from '../../urls/frontendUrl';

const Footer = () => (
	<div className="rct-footer d-flex justify-content-between align-items-center">
		<ul className="list-inline footer-menus mb-0">
			<li className="list-inline-item">
				<Button component={Link} to="/app/about-us"><IntlMessages id="sidebar.aboutUs" /></Button>
			</li>
			<li className="list-inline-item">
				<Button component={Link} to={LANDING.LEGAL_MENTION}>Mentions légales</Button>
			</li>
		</ul>
		<h5 className="mb-0">{AppConfig.copyRightText}</h5>
	</div>
);

export default Footer;
