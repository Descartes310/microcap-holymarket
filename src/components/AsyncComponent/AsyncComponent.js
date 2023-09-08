/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

export const AsyncLanding = Loadable({
	loader: () => import("Routes/custom/dashboard/landing"),
	loading: () => <RctPageLoader />,
});

export const AsyncNotifications = Loadable({
	loader: () => import("Routes/custom/notifications"),
	loading: () => <RctPageLoader />,
});

// themify icons
const AsyncThemifyIconsComponent = Loadable({
	loader: () => import("Routes/icons/themify-icons"),
	loading: () => <RctPageLoader />,
});

// Simple Line Icons
const AsyncSimpleLineIconsComponent = Loadable({
	loader: () => import("Routes/icons/simple-line-icons"),
	loading: () => <RctPageLoader />,
});

// Material Icons
const AsyncMaterialIconsComponent = Loadable({
	loader: () => import("Routes/icons/material-icons"),
	loading: () => <RctPageLoader />,
});

/*---------------- Session ------------------*/

// Session Login
const AsyncSessionLoginComponent = Loadable({
	loader: () => import("Routes/session/login"),
	loading: () => <RctPageLoader />,
});

// Session Register
const AsyncSessionRegisterComponent = Loadable({
	loader: () => import("Routes/session/register"),
	loading: () => <RctPageLoader />,
});

// Session Forgot Password
const AsyncSessionForgotPasswordComponent = Loadable({
	loader: () => import("Routes/session/forgot-password/SendResetPasswordLink"),
	loading: () => <RctPageLoader />,
});
/*------------------ UI Components ---------------*/

// components Appbar
const AsyncUIAppbarComponent = Loadable({
	loader: () => import("Routes/components/app-bar"),
	loading: () => <RctPageLoader />,
});


export const AsyncUserAccountTypes = Loadable({
	loader: () => import("Routes/custom/account-types"),
	loading: () => <RctPageLoader />,
});

export const AsyncGroups = Loadable({
	loader: () => import("Routes/custom/groups"),
	loading: () => <RctPageLoader />,
});

export const AsyncProfile = Loadable({
	loader: () => import("Routes/custom/profiles"),
	loading: () => <RctPageLoader />,
});

export const AsyncMarketplace = Loadable({
	loader: () => import("Routes/custom/marketplace"),
	loading: () => <RctPageLoader />,
});

export const AsyncSettings = Loadable({
	loader: () => import("Routes/custom/settings"),
	loading: () => <RctPageLoader />,
});

export const AsyncProjects = Loadable({
	loader: () => import("Routes/custom/projects"),
	loading: () => <RctPageLoader />,
});

export const AsyncFundings = Loadable({
	loader: () => import("Routes/custom/fundings"),
	loading: () => <RctPageLoader />,
});

export const AsyncNetworks = Loadable({
	loader: () => import("Routes/custom/networks"),
	loading: () => <RctPageLoader />,
});

export const AsyncBroker = Loadable({
	loader: () => import("Routes/custom/brokers"),
	loading: () => <RctPageLoader />,
});

export const AsyncBank = Loadable({
	loader: () => import("Routes/custom/bank-services"),
	loading: () => <RctPageLoader />,
});

export const AsyncPrevision = Loadable({
	loader: () => import("Routes/custom/previsions"),
	loading: () => <RctPageLoader />,
});

export const AsyncSupervision = Loadable({
	loader: () => import("Routes/custom/supervision"),
	loading: () => <RctPageLoader />,
});

export const AsyncAsset = Loadable({
	loader: () => import("Routes/custom/assets"),
	loading: () => <RctPageLoader />,
});

export {
	AsyncThemifyIconsComponent,
	AsyncSimpleLineIconsComponent,
	AsyncMaterialIconsComponent,
	AsyncSessionLoginComponent,
	AsyncSessionRegisterComponent,
	AsyncSessionForgotPasswordComponent,
	AsyncUIAppbarComponent
};
