/**
 * Ecommerce Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
	AsyncShoplistComponent,
	AsyncShopGridComponent,
	AsyncInvoiceComponent,
	AsyncShopComponent,
	AsyncCartComponent,
	AsyncCheckoutComponent,
	AsyncEcommerceDashboardComponent,
	AsyncSaasDashboardComponent,
	AsyncAgencyDashboardComponent,
	AsyncNewsDashboardComponent
} from 'Components/AsyncComponent/AsyncComponent';


import RctAppLayout from 'Components/RctAppLayout';
const Ecommerce = ({ match }) => (
	<RctAppLayout>
		<div className="content-wrapper">
			{/*<Helmet>
			<title>Ecommerce | Shop</title>
			<meta name="description" content="Reactify Ecommerce Shop" />
		</Helmet>*/}
			<div className="dashboard-wrapper">
				<Switch>
					<Redirect exact from={`${match.url}/`} to={`${match.url}/ecommerce`} />
					<Route path={`${match.url}/ecommerce`} component={AsyncEcommerceDashboardComponent} />
					<Route path={`${match.url}/saas`} component={AsyncSaasDashboardComponent} />
					<Route path={`${match.url}/agency`} component={AsyncAgencyDashboardComponent} />
					<Route path={`${match.url}/news`} component={AsyncNewsDashboardComponent} />
				</Switch>
			</div>
		</div>
	</RctAppLayout>
);

export default Ecommerce;
