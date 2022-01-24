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
/*--------------- Charts ----------------*/

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

// components Alerts
const AsyncUIAlertsComponent = Loadable({
	loader: () => import("Routes/components/alert"),
	loading: () => <RctPageLoader />,
});

// components Appbar
const AsyncUIAppbarComponent = Loadable({
	loader: () => import("Routes/components/app-bar"),
	loading: () => <RctPageLoader />,
});

// components BottomNavigation
const AsyncUIBottomNavigationComponent = Loadable({
	loader: () => import("Routes/components/bottom-navigation"),
	loading: () => <RctPageLoader />,
});

// components BottomNavigation
const AsyncUIAvatarsComponent = Loadable({
	loader: () => import("Routes/components/avatar"),
	loading: () => <RctPageLoader />,
});

// components Buttons
const AsyncUIButtonsComponent = Loadable({
	loader: () => import("Routes/components/buttons"),
	loading: () => <RctPageLoader />,
});

// components Badges
const AsyncUIBadgesComponent = Loadable({
	loader: () => import("Routes/components/badges"),
	loading: () => <RctPageLoader />,
});

// components Cards
const AsyncUICardsComponent = Loadable({
	loader: () => import("Routes/components/cards"),
	loading: () => <RctPageLoader />,
});

// components Dialog
const AsyncUIDialogComponent = Loadable({
	loader: () => import("Routes/components/dialog"),
	loading: () => <RctPageLoader />,
});

// components Dividers
const AsyncUIDividersComponent = Loadable({
	loader: () => import("Routes/components/dividers"),
	loading: () => <RctPageLoader />,
});

// components ExpansionPanel
const AsyncUIExpansionPanelComponent = Loadable({
	loader: () => import("Routes/components/expansion-panel"),
	loading: () => <RctPageLoader />,
});

// components Grid List
const AsyncUIGridListComponent = Loadable({
	loader: () => import("Routes/components/grid-list"),
	loading: () => <RctPageLoader />,
});

// components List
const AsyncUIListComponent = Loadable({
	loader: () => import("Routes/components/list"),
	loading: () => <RctPageLoader />,
});

// components Menu
const AsyncUIMenuComponent = Loadable({
	loader: () => import("Routes/components/menu"),
	loading: () => <RctPageLoader />,
});

// components Popover
const AsyncUIPopoverComponent = Loadable({
	loader: () => import("Routes/components/popover"),
	loading: () => <RctPageLoader />,
});

// components SelectionControls
const AsyncUISelectionControlsComponent = Loadable({
	loader: () => import("Routes/components/selection-controls"),
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




export {
	AsyncThemifyIconsComponent,
	AsyncSimpleLineIconsComponent,
	AsyncMaterialIconsComponent,
	AsyncSessionLoginComponent,
	AsyncSessionRegisterComponent,
	AsyncSessionForgotPasswordComponent,
	AsyncUIAlertsComponent,
	AsyncUIAppbarComponent,
	AsyncUIBottomNavigationComponent,
	AsyncUIAvatarsComponent,
	AsyncUIButtonsComponent,
	AsyncUIBadgesComponent,
	AsyncUICardsComponent,
	AsyncUIDialogComponent,
	AsyncUIDividersComponent,
	AsyncUIExpansionPanelComponent,
	AsyncUIGridListComponent,
	AsyncUIListComponent,
	AsyncUIMenuComponent,
	AsyncUIPopoverComponent,
	AsyncUISelectionControlsComponent,
};
