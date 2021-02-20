/**
 * User Profile Page
 */
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Helmet } from "react-helmet";
import {withRouter} from "react-router-dom";
// Components
import UpdateProfile from './UpdateProfile';
import UpdateAdress from './UpdateAdress';
import EmailPrefrences from '../../../users/user-profile-1/component/EmailPrefrences';
import Messages from '../../../users/user-profile-1/component/Messages';
import Address from '../../../users/user-profile-1/component/Address';
import UserBlock from '../../../users/user-profile-1/component/UserBlock';
import {getUserProfiles, setRequestGlobalAction} from "Actions";

// rct card box
import { RctCard } from 'Components/RctCard';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// For Tab Content
function TabContainer(props) {
   return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
         {props.children}
      </Typography>
   );
}

 class SingleProfile extends Component {

   state = {
      activeTab: this.props.location.state ? this.props.location.state.activeTab : 0
   }

   handleChange = (event, value) => {
      this.setState({ activeTab: value });
   }

   render() {
      const { authUser} = this.props;
      const { activeTab } = this.state;
      return (
         <div className="userProfile-wrapper">
            <Helmet>
               <title>User Profile</title>
               <meta name="description" content="User Profile" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.userProfile" />} match={this.props.match} />
            <RctCard>
               <UserBlock 
                  userName={authUser.commercialName ? authUser.commercialName : authUser.firstName}  
                  userEmail={authUser.user.email}
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
                           label={<IntlMessages id="components.myProfile" />}
                        />
                         <Tab
                           icon={<i className="ti-home"></i>}
                           label={<IntlMessages id="components.address" />}
                        />
                        {/*<Tab
                           icon={<i className="ti-email"></i>}
                           label={<IntlMessages id="components.emailPrefrences" />}
                        />
                        <Tab
                           icon={<i className="ti-comment-alt"></i>}
                           label={<IntlMessages id="widgets.messages" />}
                        />*/}
                       
                     </Tabs>
                  </AppBar>
                  {activeTab === 0 &&
                     <TabContainer>
                        <UpdateProfile userProfileInformations={authUser}/>
                     </TabContainer>}
                  {activeTab === 1 &&
                     <TabContainer>
                        <UpdateAdress userAdressInformations={authUser}/>
                     </TabContainer>}
                  {/*activeTab === 2 &&
                     <TabContainer>
                        <Messages />
                     </TabContainer>
                  {activeTab === 3 &&
                     <TabContainer>
                        <Address />
                  </TabContainer>*/}
               </div>
            </RctCard>
         </div>
      );
   }
}

const mapStateToProps = ({ requestGlobalLoader, userProfile, authUser  }) => {
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
})(withRouter(injectIntl(SingleProfile)))