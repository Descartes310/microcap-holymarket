/**
 * App Reducers
 */
import settings from './settings';
import CartReducer from './CartReducer';
import { combineReducers } from 'redux';
import groupReducer from './GroupReducer';
import UsersReducer from './UsersReducer';
import tokensReducer from './TokensReducer';
import sidebarReducer from './SidebarReducer';
import authUserReducer from './AuthUserReducer';
import AppLoadingReducer from './AppLoadingReducer';
import NotificationsReducer from './NotificationsReducer';
import RequestGlobalReducer from './RequestGlobalReducer';
import PermissionAlertBoxReducer from './PermissionAlertBoxReducer';

const reducers = combineReducers({
   settings,
   cart: CartReducer,
   group: groupReducer,
   users: UsersReducer,
   tokens: tokensReducer,
   sidebar: sidebarReducer,
   authUser: authUserReducer,
   appLoading: AppLoadingReducer,
   notifications: NotificationsReducer,
   requestGlobalLoader: RequestGlobalReducer,
   permissionAlertBox: PermissionAlertBoxReducer
});

export default reducers;
