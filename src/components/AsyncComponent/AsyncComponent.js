/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

export const AsyncCommunitySpace = Loadable({
	loader: () => import("Routes/custom/communityT"),
	loading: () => <RctPageLoader />,
});

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

export const AsyncBranchList = Loadable({
	loader: () => import("Routes/custom/branch"),
	loading: () => <RctPageLoader />,
});

export const AsyncBranchCreate = Loadable({
	loader: () => import("Routes/custom/branch/new-create"),
	loading: () => <RctPageLoader />,
});

/*export const AsyncBranchShow = Loadable({
	loader: () => import("Routes/custom/branch/show"),
	loading: () => <RctPageLoader />,
});*/

export const AsyncBranchNetworkConfiguration = Loadable({
	loader: () => import("Routes/custom/branch/show/Configuration"),
	loading: () => <RctPageLoader />,
});

export const AsyncBranchNetworkCoverage = Loadable({
	loader: () => import("Routes/custom/branch/show/Coverage"),
	loading: () => <RctPageLoader />,
});

export const AsyncCatalogProducts = Loadable({
	loader: () => import("Routes/custom/products/catalog-products"),
	loading: () => <RctPageLoader />,
});

export const AsyncCatalogSales = Loadable({
	loader: () => import("Routes/custom/products/catalog-sales"),
	loading: () => <RctPageLoader />,
});

export const AsyncComOperationType = Loadable({
	loader: () => import("Routes/custom/commercial-management/operation-type"),
	loading: () => <RctPageLoader />,
});

export const AsyncComOperation = Loadable({
	loader: () => import("Routes/custom/commercial-management/operation"),
	loading: () => <RctPageLoader />,
});

export const AsyncComOffer = Loadable({
	loader: () => import("Routes/custom/commercial-management/offer"),
	loading: () => <RctPageLoader />,
});

export const AsyncGroupAdmin = Loadable({
	loader: () => import("Routes/custom/communityT/admin"),
	loading: () => <RctPageLoader />,
});

export const AsyncUserProfile = Loadable({
	loader: () => import("Routes/custom/users/user-profile"),
	loading: () => <RctPageLoader />,
});

export const AsyncProducts = Loadable({
	loader: () => import("Routes/custom/products/self"),
	loading: () => <RctPageLoader />,
});

export const AsyncNotifications = Loadable({
	loader: () => import("Routes/custom/notifications"),
	loading: () => <RctPageLoader />,
});

export const AsyncStore = Loadable({
	loader: () => import("Routes/custom/store"),
	loading: () => <RctPageLoader />,
});

export const AsyncAccess = Loadable({
	loader: () => import("Routes/custom/access"),
	loading: () => <RctPageLoader />,
});

export const AsyncStoreWrapper = Loadable({
	loader: () => import("Routes/custom/store/indexWrapper"),
	loading: () => <RctPageLoader />,
});

export const AsyncCommunity = Loadable({
	loader: () => import("Routes/custom/community"),
	loading: () => <RctPageLoader />,
});

export const AsyncUsers = Loadable({
	loader: () => import("Routes/custom/users/users"),
	loading: () => <RctPageLoader />,
});

export const AsyncUsersAccounts = Loadable({
	loader: () => import("Routes/custom/users/accounts"),
	loading: () => <RctPageLoader />,
});

export const AsyncAllUsersAccounts = Loadable({
	loader: () => import("Routes/custom/users/all-users"),
	loading: () => <RctPageLoader />,
});

export const AsyncSettingNotifications = Loadable({
	loader: () => import("Routes/custom/settings/notifications"),
	loading: () => <RctPageLoader />,
});

export const AsyncActivateBranch = Loadable({
	loader: () => import("Routes/custom/branch/Activation"),
	loading: () => <RctPageLoader />,
});

export const AsyncSampleBranchList = Loadable({
	loader: () => import("Routes/custom/branch/SampleBranchList"),
	loading: () => <RctPageLoader />,
});

export const AsyncProjects = Loadable({
	loader: () => import("Routes/custom/projects"),
	loading: () => <RctPageLoader />,
});

export const AsyncCommunityProject = Loadable({
	loader: () => import("Routes/custom/communityT/projects"),
	loading: () => <RctPageLoader />,
});

// ecommerce dashboard
const AsyncEcommerceDashboardComponent = Loadable({
	loader: () => import("Routes/dashboard/ecommerce"),
	loading: () => <RctPageLoader />,
});

// agency dashboard
const AsyncSaasDashboardComponent = Loadable({
	loader: () => import("Routes/dashboard/saas"),
	loading: () => <RctPageLoader />,
});

// agency dashboard
const AsyncAgencyDashboardComponent = Loadable({
	loader: () => import("Routes/dashboard/agency"),
	loading: () => <RctPageLoader />,
});

// boxed dashboard
const AsyncNewsDashboardComponent = Loadable({
	loader: () => import("Routes/dashboard/news"),
	loading: () => <RctPageLoader />,
});

const AsyncUserWidgetComponent = Loadable({
	loader: () => import("Routes/widgets/user-widgets"),
	loading: () => <RctPageLoader />,
});

const AsyncUserChartsComponent = Loadable({
	loader: () => import("Routes/widgets/charts-widgets"),
	loading: () => <RctPageLoader />,
});

const AsyncGeneralWidgetsComponent = Loadable({
	loader: () => import("Routes/widgets/general-widgets"),
	loading: () => <RctPageLoader />,
});

const AsyncPromoWidgetsComponent = Loadable({
	loader: () => import("Routes/widgets/promo-widgets"),
	loading: () => <RctPageLoader />,
});

// about us
const AsyncAboutUsComponent = Loadable({
	loader: () => import("Routes/about-us"),
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

// Users List
const AsyncUsersListComponent = Loadable({
	loader: () => import("Routes/users/user-list"),
	loading: () => <RctPageLoader />,
});

// Users Profile
const AsyncUserProfileComponent = Loadable({
	loader: () => import("Routes/users/user-profile"),
	loading: () => <RctPageLoader />,
});

// Users Profile 1
const AsyncUserProfile1Component = Loadable({
	loader: () => import("Routes/users/user-profile-1"),
	loading: () => <RctPageLoader />,
});

// Users Management
const AsyncUserManagementComponent = Loadable({
	loader: () => import("Routes/users/user-management"),
	loading: () => <RctPageLoader />,
});

/*--------------- Charts ----------------*/

// Re charts
const AsyncRechartsComponent = Loadable({
	loader: () => import("Routes/charts/recharts"),
	loading: () => <RctPageLoader />,
});

// ReactChartsjs2
const AsyncReactChartsjs2Component = Loadable({
	loader: () => import("Routes/charts/react-chartjs2"),
	loading: () => <RctPageLoader />,
});

/*---------------------- Calendar -----------*/

// Basic Calendar
const AsyncBasicCalendarComponent = Loadable({
	loader: () => import("Routes/calendar/BasicCalendar"),
	loading: () => <RctPageLoader />,
});

// Cultures Calendar
const AsyncCulturesComponent = Loadable({
	loader: () => import("Routes/calendar/Cultures"),
	loading: () => <RctPageLoader />,
});

// Selectable Calendar
const AsyncSelectableComponent = Loadable({
	loader: () => import("Routes/calendar/Selectable"),
	loading: () => <RctPageLoader />,
});

// Custom Calendar
const AsyncCustomComponent = Loadable({
	loader: () => import("Routes/calendar/Custom"),
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

// Session Lock Screen
const AsyncSessionLockScreenComponent = Loadable({
	loader: () => import("Routes/session/lock-screen"),
	loading: () => <RctPageLoader />,
});

// Session Forgot Password
const AsyncSessionForgotPasswordComponent = Loadable({
	loader: () => import("Routes/session/forgot-password/SendResetPasswordLink"),
	loading: () => <RctPageLoader />,
});

// Session Page 404
const AsyncSessionPage404Component = Loadable({
	loader: () => import("Routes/session/404"),
	loading: () => <RctPageLoader />,
});

// Session Page 404
const AsyncSessionPage500Component = Loadable({
	loader: () => import("Routes/session/500"),
	loading: () => <RctPageLoader />,
});

// terms and condition
const AsyncTermsConditionComponent = Loadable({
	loader: () => import("Routes/pages/terms-condition"),
	loading: () => <RctPageLoader />,
});

/*---------------- Editor -------------------*/

// editor quill
const AsyncQuillEditorComponent = Loadable({
	loader: () => import("Routes/editor/quill-editor"),
	loading: () => <RctPageLoader />,
});

// editor Wysiwyg
const AsyncWysiwygEditorComponent = Loadable({
	loader: () => import("Routes/editor/wysiwyg-editor"),
	loading: () => <RctPageLoader />,
});

/*------------- Form Elemets -------------*/

// forms elements
const AsyncFormElementsComponent = Loadable({
	loader: () => import("Routes/forms/form-elements"),
	loading: () => <RctPageLoader />,
});

// forms TextField
const AsyncTextFieldComponent = Loadable({
	loader: () => import("Routes/forms/material-text-field"),
	loading: () => <RctPageLoader />,
});

// forms TextField
const AsyncSelectListComponent = Loadable({
	loader: () => import("Routes/forms/select-list"),
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

// components CardMasonary
const AsyncUICardMasonaryComponent = Loadable({
	loader: () => import("Routes/components/card-masonry"),
	loading: () => <RctPageLoader />,
});

// components Cards
const AsyncUICardsComponent = Loadable({
	loader: () => import("Routes/components/cards"),
	loading: () => <RctPageLoader />,
});

// components Chips
const AsyncUIChipsComponent = Loadable({
	loader: () => import("Routes/components/chip"),
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

// components Drawers
const AsyncUIDrawersComponent = Loadable({
	loader: () => import("Routes/components/drawers"),
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

// components Progress
const AsyncUIProgressComponent = Loadable({
	loader: () => import("Routes/components/progress"),
	loading: () => <RctPageLoader />,
});

// components Snackbar
const AsyncUISnackbarComponent = Loadable({
	loader: () => import("Routes/components/snackbar"),
	loading: () => <RctPageLoader />,
});

// components SelectionControls
const AsyncUISelectionControlsComponent = Loadable({
	loader: () => import("Routes/components/selection-controls"),
	loading: () => <RctPageLoader />,
});

/*---------------- Advance UI Components -------------*/

// advance components DateAndTimePicker
const AsyncAdvanceUIDateAndTimePickerComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/dateTime-picker"),
	loading: () => <RctPageLoader />,
});

// advance components Tabs
const AsyncAdvanceUITabsComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/tabs"),
	loading: () => <RctPageLoader />,
});

// advance components Stepper
const AsyncAdvanceUIStepperComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/stepper"),
	loading: () => <RctPageLoader />,
});

// advance components NotificationComponent
const AsyncAdvanceUINotificationComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/notification"),
	loading: () => <RctPageLoader />,
});

// advance components SweetAlert
const AsyncAdvanceUISweetAlertComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/sweet-alert"),
	loading: () => <RctPageLoader />,
});

// advance components autoComplete
const AsyncAdvanceUIAutoCompleteComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/autoComplete"),
	loading: () => <RctPageLoader />,
});

export {
	AsyncUserWidgetComponent,
	AsyncUserChartsComponent,
	AsyncGeneralWidgetsComponent,
	AsyncPromoWidgetsComponent,
	AsyncAboutUsComponent,
	AsyncThemifyIconsComponent,
	AsyncSimpleLineIconsComponent,
	AsyncMaterialIconsComponent,
	AsyncUsersListComponent,
	AsyncUserProfileComponent,
	AsyncUserProfile1Component,
	AsyncUserManagementComponent,
	AsyncRechartsComponent,
	AsyncReactChartsjs2Component,
	AsyncBasicCalendarComponent,
	AsyncCulturesComponent,
	AsyncSelectableComponent,
	AsyncCustomComponent,
	AsyncSessionLoginComponent,
	AsyncSessionRegisterComponent,
	AsyncSessionLockScreenComponent,
	AsyncSessionForgotPasswordComponent,
	AsyncSessionPage404Component,
	AsyncSessionPage500Component,
	AsyncTermsConditionComponent,
	AsyncQuillEditorComponent,
	AsyncWysiwygEditorComponent,
	AsyncFormElementsComponent,
	AsyncTextFieldComponent,
	AsyncSelectListComponent,
	AsyncUIAlertsComponent,
	AsyncUIAppbarComponent,
	AsyncUIBottomNavigationComponent,
	AsyncUIAvatarsComponent,
	AsyncUIButtonsComponent,
	AsyncUIBadgesComponent,
	AsyncUICardMasonaryComponent,
	AsyncUICardsComponent,
	AsyncUIChipsComponent,
	AsyncUIDialogComponent,
	AsyncUIDividersComponent,
	AsyncUIDrawersComponent,
	AsyncUIExpansionPanelComponent,
	AsyncUIGridListComponent,
	AsyncUIListComponent,
	AsyncUIMenuComponent,
	AsyncUIPopoverComponent,
	AsyncUIProgressComponent,
	AsyncUISnackbarComponent,
	AsyncUISelectionControlsComponent,
	AsyncAdvanceUIDateAndTimePickerComponent,
	AsyncAdvanceUITabsComponent,
	AsyncAdvanceUIStepperComponent,
	AsyncAdvanceUINotificationComponent,
	AsyncAdvanceUISweetAlertComponent,
	AsyncAdvanceUIAutoCompleteComponent,
	AsyncEcommerceDashboardComponent,
	AsyncSaasDashboardComponent,
	AsyncAgencyDashboardComponent,
	AsyncNewsDashboardComponent
};
