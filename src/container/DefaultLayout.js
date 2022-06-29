/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import RctAppLayout from 'Components/RctAppLayout';

// router service
import routerService from "../services/_routerService";

class DefaultLayout extends Component {
	render() {
		const { match } = this.props;
		return (
			<RctAppLayout>
				<Switch>
					{routerService && routerService.map((route,key)=>
						<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
					)}

					<Redirect to={'/'} />
				</Switch>
			</RctAppLayout>
		);
	}
}

export default withRouter(connect(null)(DefaultLayout));
