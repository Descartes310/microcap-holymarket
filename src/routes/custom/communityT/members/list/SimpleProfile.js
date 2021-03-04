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
import { getUser} from "Actions";
// Components
import SimpleProfileDisplay from './SimpleProfileDisplay';
import SimpleAdressDisplay from './SimpleAdressDisplay';
import UserBlock from '../../../../users/user-profile-1/component/UserBlock';
import {getUserProfiles, setRequestGlobalAction, setAuthUser} from "Actions";

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

 class SimpleProfile extends Component {

   state = {
      activeTab: this.props.location.state ? this.props.location.state.activeTab : 0
   }

  
   handleChange = (event, value) => {
      this.setState({ activeTab: value });
   }


   render() {
      
      const { currentUser} = this.props;
      const { activeTab } = this.state;
      console.log("currentUser =>", currentUser);
      return (
         <div className="userProfile-wrapper">

            <RctCard>
               <UserBlock 
                  userName={currentUser.name}  
                  userEmail={currentUser.email}
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
                         
                       
                     </Tabs>
                  </AppBar>
                  {activeTab === 0 &&
                     <TabContainer>
                        <SimpleProfileDisplay userProfileInformations={currentUser}/>
                     </TabContainer>}
                  {activeTab === 1 &&
                     <TabContainer>
                        <SimpleAdressDisplay userAdressInformations={currentUser}/>
                     </TabContainer>}
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
})(withRouter(injectIntl(SimpleProfile)))