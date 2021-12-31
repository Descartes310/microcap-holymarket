/**
 * Redux App Settings Actions
 */
import { MenuItem } from 'Components/Sidebar/NavLinks';
import {
    COLLAPSED_SIDEBAR,
    DARK_MODE,
    BOXED_LAYOUT,
    RTL_LAYOUT,
    MINI_SIDEBAR,
    SEARCH_FORM_ENABLE,
    CHANGE_THEME_COLOR,
    TOGGLE_SIDEBAR_IMAGE,
    SET_SIDEBAR_IMAGE,
    SET_LANGUAGE,
    START_USER_TOUR,
    STOP_USER_TOUR,
    TOGGLE_DARK_SIDENAV,
	 CHANGE_AGENCY_LAYOUT_BG,
} from './types';

/**
 * Redux Action To Emit Collapse Sidebar
 * @param {*boolean} isCollapsed 
 */
export const collapsedSidebarAction = (isCollapsed) => ({
    type: COLLAPSED_SIDEBAR,
    isCollapsed
}) as const;

/**
 * Redux Action To Start User Tour
 */
export const startUserTour = () => ({
    type: START_USER_TOUR
}) as const;

/**
 * Redux Action To Stop User Tour
 */
export const stopUserTour = () => ({
    type: STOP_USER_TOUR
}) as const;

/**
 * Redux Action To Emit Dark Mode
 * @param {*boolean} isDarkMode 
 */
export const darkModeAction = (isDarkMode) => ({
    type: DARK_MODE,
    payload: isDarkMode
}) as const;

/**
 * Redux Action To Emit Boxed Layout
 * @param {*boolean} isBoxLayout 
 */
export const boxLayoutAction = (isBoxLayout) => ({
    type: BOXED_LAYOUT,
    payload: isBoxLayout
}) as const;

/**
 * Redux Action To Emit Rtl Layout
 *  @param {*boolean} isRtlLayout
 */
export const rtlLayoutAction = (isRtlLayout) => ({
    type: RTL_LAYOUT,
    payload: isRtlLayout
}) as const;

/**
 * Redux Action To Toggle Sidebar Menus
 */
export const onToggleMenu = (selectedMenu) => ({
    type: 'TOGGLE_MENU',
    payload: selectedMenu
}) as const;

/**
 * Redux Action To Toggle Agency Sidebar Menus
 */
export const onToggleAgencyMenu = (selectedAgencyMenu) => ({
    type: 'AGENCY_TOGGLE_MENU',
    payload: selectedAgencyMenu
}) as const;

/**
 * Redux Action To Emit Mini Sidebar
 */
export const miniSidebarAction = (isMiniSidebar) => ({
    type: MINI_SIDEBAR,
    payload: isMiniSidebar
}) as const;

/**
 * Redux Action To Enable/Disable The Search Form
 */
export const toggleSearchForm = () => ({
    type: SEARCH_FORM_ENABLE
}) as const;

/**
 * Reduc Action To Change Theme Colors
 */
export const changeThemeColor = (theme) => ({
    type: CHANGE_THEME_COLOR,
    payload: theme
}) as const;

/**
 * Redux Action To Enable/Disable Sidebar Background Image
 */
export const toggleSidebarImage = () => ({
    type: TOGGLE_SIDEBAR_IMAGE
}) as const;

/**
 * Redux Action To Set Sidebar Background Image
 */
export const setSidebarBgImageAction = (sidebarImage) => ({
    type: SET_SIDEBAR_IMAGE,
    payload: sidebarImage
}) as const;

/**
 * Redux Action To Set Language
 */
export const setLanguage = (language) => ({
    type: SET_LANGUAGE,
    payload: language
}) as const;

/**
 * Redux Action To Toggle Dark Sidenav
 */
export const toggleDarkSidebar = () => ({
    type: TOGGLE_DARK_SIDENAV
}) as const;

/**
 * Redux Action For Agency Layout Bg Handler
 */
export const agencyLayoutBgHandler = (color) => ({
    type: CHANGE_AGENCY_LAYOUT_BG,
    payload: color
}) as const;



export type SidebarActions = ReturnType<typeof onToggleMenu | typeof onToggleAgencyMenu>;
