/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import settings from './settings';
import AppLoadingReducer from './AppLoadingReducer';
import chatAppReducer from './ChatAppReducer';
import emailAppReducer from './EmailAppReducer';
import sidebarReducer from './SidebarReducer';
import todoAppReducer from './TodoAppReducer';
import tokensReducer from './TokensReducer';
import authUserReducer from './AuthUserReducer';
import feedbacksReducer from './FeedbacksReducer';
import ecommerceReducer from './EcommerceReducer';
import CrmReducer from './CrmReducer';

const reducers = combineReducers({
   settings,
   chatAppReducer,
   appLoading: AppLoadingReducer,
   emailApp: emailAppReducer,
   sidebar: sidebarReducer,
   todoApp: todoAppReducer,
   authUser: authUserReducer,
   tokens: tokensReducer,
   feedback: feedbacksReducer,
   ecommerce: ecommerceReducer,
   CrmReducer: CrmReducer
});

export default reducers;
