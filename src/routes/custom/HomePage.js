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
            <div className="ecom-dashboard-wrapper">
                
                <PageTitleBar title={<IntlMessages id="sidebar.dashboard" />} match={match} />
                <div className="row">
					<div className="col-sm-6 col-md-4 w-xs-half-block">
						<VisitorAreaChartWidget
							data={visitorsData}
						/>
					</div>

					<div className="col-sm-12 col-md-4 w-xs-half-block">
						<OrdersAreaChartWidget
							data={ordersData}
						/>
					</div>
					<div className="col-sm-6 col-md-4 w-xs-full">
						<SalesAreaChartWidget
							data={salesData}
						/>
					</div>
				</div>
                <div className="row">
                    <RctCollapsibleCard
						colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
						fullBlock
						customClasses="overflow-hidden"
					>
						<Notifications />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-8 col-lg-8 w-xs-full"
						heading={<IntlMessages id="widgets.RecentOrders" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<RecentOrdersWidget />
					</RctCollapsibleCard>
				</div>
            </div>
        )
    }
}
