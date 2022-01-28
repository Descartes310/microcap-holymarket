/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

export const AsyncDiscover = Loadable({
	loader: () => import("Routes/custom/dashboard/discover/index"),
	loading: () => <RctPageLoader />,
});

export const AsyncGallery = Loadable({
	loader: () => import("Routes/custom/dashboard/discover/pages/Gallery"),
	loading: () => <RctPageLoader />,
});

export const AsyncPionier = Loadable({
	loader: () => import("Routes/custom/dashboard/discover/pages/Pionier"),
	loading: () => <RctPageLoader />,
});

export const AsyncSolidarity = Loadable({
	loader: () => import("Routes/custom/dashboard/Solidarity"),
	loading: () => <RctPageLoader />,
});

export const AsyncGetIn = Loadable({
	loader: () => import("Routes/custom/dashboard/GetIn"),
	loading: () => <RctPageLoader />,
});

export const AsyncMoneyManagement = Loadable({
	loader: () => import("Routes/custom/dashboard/MoneyManagement"),
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

export {
	AsyncThemifyIconsComponent,
	AsyncSimpleLineIconsComponent,
	AsyncMaterialIconsComponent,
	AsyncSessionLoginComponent,
	AsyncSessionRegisterComponent,
	AsyncSessionForgotPasswordComponent,
	AsyncUIAppbarComponent
};
