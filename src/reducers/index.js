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
import RequestGlobalReducer from './RequestGlobalReducer';
import PermissionAlertBoxReducer from './PermissionAlertBoxReducer';
import NetworkProfileReducer from './NetworkProfileReducer';
import CatalogReducer from './CatalogReducer';
import CatalogTypeReducer from './CatalogTypeReducer';
import BranchProductsReducer from './BranchProductsReducer';
import CatalogProductsReducer from './CatalogProductsReducer';
import CategoryProductsReducer from './CategoryProductsReducer';
import ProductTypeReducer from './ProductTypeReducer';
import UserProfileReducer from './UserProfileReducer';
import UserPermissionsReducer from './UserPermissionsReducer';
import NetworkProfileTypeReducer from './NetworkProfileTypeReducer';
import UsersReducer from './UsersReducer';
import UserCommunitiesReducer from './UserCommunitiesReducer';
import UserCommunitiesAdminReducer from './UserCommunitiesAdminReducer';
import UserCommunitiesNotInReducer from './UserCommunitiesNotInReducer';
import ComInvitationsPendingReducer from './ComInvitationsPendingReducer';
import CurrentCommunityReducer from './CurrentCommunityReducer';
import PackagesReducer from './PackagesReducer';
import SystemObjectReducer from './SystemObjectReducer';
import ComOperationTypeReducer from './ComOperationTypeReducer';
import ComOperationReducer from './ComOperationReducer';
import ComOfferReducer from './ComOfferReducer';
import ProductReducer from './ProductReducer';
import CartReducer from './CartReducer';
import MandateTypeReducer from './MandateTypeReducer';
import MandateModelReducer from './MandateModelReducer';
import MandateReducer from './MandateReducer';
import BranchUsersReducer from './BranchUsersReducer';
import ModelNotificationsReducer from './ModelNotificationsReducer';
import NotificationsReducer from './NotificationsReducer';
import ServicesNotificationsReducer from './ServicesNotificationsReducer';
import UsersAccountsReducer from './UsersAccountsReducer';
import SampleBranchesReducer from './SampleBranchesReducer';
import ProjectWorksReducer from './ProjectWorksReducer';
import ProjectStandardReducer from './ProjectStandardReducer';

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
   CrmReducer: CrmReducer,
   requestGlobalLoader: RequestGlobalReducer,
   permissionAlertBox: PermissionAlertBoxReducer,
   networkProfile: NetworkProfileReducer,
   catalogs: CatalogReducer,
   catalogTypes: CatalogTypeReducer,
   branchProducts: BranchProductsReducer,
   catalogProducts: CatalogProductsReducer,
   categoryProducts: CategoryProductsReducer,
   productTypes: ProductTypeReducer,
   userProfile: UserProfileReducer,
   userPermissions: UserPermissionsReducer,
   networkProfileType: NetworkProfileTypeReducer,
   users: UsersReducer,
   userCommunities: UserCommunitiesReducer,
   userCommunitiesAdmin: UserCommunitiesAdminReducer,
   userCommunitiesNotIn: UserCommunitiesNotInReducer,
   comInvitationsPending: ComInvitationsPendingReducer,
   currentCommunity: CurrentCommunityReducer,
   packages: PackagesReducer,
   systemObject: SystemObjectReducer,
   comOperationType: ComOperationTypeReducer,
   comOperation: ComOperationReducer,
   comOffer: ComOfferReducer,
   products: ProductReducer,
   cart: CartReducer,
   mandateType: MandateTypeReducer,
   mandateModel: MandateModelReducer,
   mandate: MandateReducer,
   branchUsers: BranchUsersReducer,
   modelNotifications: ModelNotificationsReducer,
   notifications: NotificationsReducer,
   servicesNotifications: ServicesNotificationsReducer,
   usersAccounts: UsersAccountsReducer,
   sampleBranches: SampleBranchesReducer,
   projectWorks: ProjectWorksReducer,
   projectStandard: ProjectStandardReducer,
});

export default reducers;
