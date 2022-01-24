/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import settings from './settings';
import AppLoadingReducer from './AppLoadingReducer';
import sidebarReducer from './SidebarReducer';
import tokensReducer from './TokensReducer';
import authUserReducer from './AuthUserReducer';
import RequestGlobalReducer from './RequestGlobalReducer';
import PermissionAlertBoxReducer from './PermissionAlertBoxReducer';
import UsersReducer from './UsersReducer';
import CartReducer from './CartReducer';
import NotificationsReducer from './NotificationsReducer';

const reducers = combineReducers({
   settings,
   appLoading: AppLoadingReducer,
   sidebar: sidebarReducer,
   authUser: authUserReducer,
   tokens: tokensReducer,
   requestGlobalLoader: RequestGlobalReducer,
   permissionAlertBox: PermissionAlertBoxReducer,
   users: UsersReducer,
   cart: CartReducer,
   notifications: NotificationsReducer,
});

export default reducers;
