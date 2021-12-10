/**
 * User Profile Page
 */
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Tab from '@material-ui/core/Tab';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import UserCurrency from './UserCurrency';
import UserProfiles from './UserProfiles';
import { RctCard } from 'Components/RctCard';
import IntlMessages from 'Util/IntlMessages';
import { withRouter } from "react-router-dom";
import { getFilePath } from "Helpers/helpers";
import AppBar from '@material-ui/core/AppBar';
import UserOrganisations from "./UserOrganisations";
import Typography from '@material-ui/core/Typography';
import UpdateAdressDisplay from './UpdateAdressDisplay';
import UpdateProfileDisplay from './UpdateProfileDisplay';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { getUserProfiles, setRequestGlobalAction } from "Actions";
import UserBlock from '../../../users/user-profile-1/component/UserBlock';

// For Tab Content
function TabContainer(props) {
   return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
         {props.children}
      </Typography>
   );
}

class DisplayProfile extends Component {

   state = {
      activeTab: this.props.location.state ? this.props.location.state.activeTab : 0
   }


   handleChange = (event, value) => {
      this.setState({ activeTab: value });
   }


   render() {
      const { authUser } = this.props;
      const { activeTab } = this.state;
      return (
         <div className="userProfile-wrapper">
            <Helmet>
               <title>Profil de l'utilisateur</title>
               <meta name="description" content="User Profile" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.userProfile" />} />

            <RctCard>
               <UserBlock
                  userName={authUser.commercialName ? authUser.commercialName : authUser.firstName}
                  userEmail={authUser.user.email}
                  userAvatar={getFilePath(authUser.user.avatar)}
               />
               <div className="rct-tabs">
                  <AppBar position="static">
                     <Tabs
                        value={activeTab}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="off"
                        indicatorColor="primary"
                     >
                        <Tab
                           icon={<i className="ti-user"></i>}
                           label={'Mes informations'}
                        />
                        <Tab
                           icon={<i className="ti-home"></i>}
                           label={'Adresses'}
                        />
                        <Tab
                           icon={<i className="ti-money"></i>}
                           label={'Devises'}
                        />
                        <Tab
                           icon={<i className="ti-user"></i>}
                           label={'Mes profiles'}
                        />
                        <Tab
                           icon={<i className="ti-bag"></i>}
                           label={'Mes Organisations'}
                        />

                     </Tabs>
                  </AppBar>
                  {activeTab === 0 &&
                     <TabContainer>
                        <UpdateProfileDisplay userProfileInformations={authUser} />
                     </TabContainer>}
                  {activeTab === 1 &&
                     <TabContainer>
                        <UpdateAdressDisplay userAdressInformations={authUser} />
                     </TabContainer>}
                  {activeTab === 2 &&
                     <TabContainer>
                        <UserCurrency />
                     </TabContainer>}
                  {activeTab === 3 &&
                     <TabContainer>
                        <UserProfiles />
                     </TabContainer>}
                  {activeTab === 4 &&
                     <TabContainer>
                        <UserOrganisations />
                     </TabContainer>}
               </div>
            </RctCard>
         </div>
      );
   }
}

const mapStateToProps = ({ requestGlobalLoader, userProfile, authUser }) => {
   return {
      requestGlobalLoader,
      authUser: authUser.data,
      loading: userProfile.loading,
      catalogTypes: userProfile.data,
      error: userProfile.error
   }
};

export default connect(mapStateToProps, {
   getUserProfiles, setRequestGlobalAction
})(withRouter(injectIntl(DisplayProfile)))