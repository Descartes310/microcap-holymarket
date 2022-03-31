/**
 * Rct Theme Provider
 */
import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

// App locale
import AppLocale from '../lang';

// themes
import primaryTheme from './themes/primaryTheme';

class RctThemeProvider extends Component {
	render() {
		const { locale, rtlLayout, activeTheme, children } = this.props;
		const currentAppLocale = AppLocale[locale.locale];
		// theme changes
		let theme = '';
		switch (activeTheme.id) {
			case 1:
				theme = primaryTheme
				break;
			default:
				theme = primaryTheme
				break;
		}

		if (rtlLayout) {
			theme.direction = 'rtl'
		} else {
			theme.direction = 'ltr'
		}

		return (
			<MuiThemeProvider theme={theme}>
				<IntlProvider
					key={currentAppLocale.locale}
					locale={currentAppLocale.locale}
					messages={currentAppLocale.messages}
				>
					<Fragment>
						{children}
					</Fragment>
				</IntlProvider>
			</MuiThemeProvider>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings
}

export default connect(mapStateToProps)(RctThemeProvider);
