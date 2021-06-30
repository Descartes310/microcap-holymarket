import React, { Component } from 'react';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';


import {
	VisitorAreaChartWidget,
	SalesAreaChartWidget,
	OrdersAreaChartWidget,
	RecentOrdersWidget,
	Notifications,
	
} from "Components/Widgets";

// widgets data
import {
	visitorsData,
	salesData,
	ordersData
} from '../dashboard/ecommerce/data';


export default class HomePage extends Component {
    render() {
        const { match } = this.props;
        return (
			<div className="full-height col-sm-12 col-md-9 col-lg-7 mx-auto text-center">
				<h1 className="mb-20">
				Welcome to microcap</h1>
			</div>
        )
    }
}
