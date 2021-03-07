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
import UpdatePassword from './UpdatePassword';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import { Form, FormGroup, Input as InputStrap } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import UserBlock from './UserBlock';
import {getUserProfiles, setRequestGlobalAction, updateUserAvatar, setAuthUser} from "Actions";
import { NotificationManager } from "react-notifications";


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
      activeTab: this.props.location.state ? this.props.location.state.activeTab : 0,
      show: false,
      avatar: null,
      data: []
   }

   handleChange = (event, value) => {
      this.setState({ activeTab: value });
   }

   handleOnClick = () => {
      this.setState({ show: true });
  };

  

  createPiece = () => {
   
   this.props.setRequestGlobalAction(true);
   updateUserAvatar({
      avatar: this.state.avatar
   }, { fileData: ['avatar'], multipart: true }).then(data => {
       this.setState({ show: false })
       NotificationManager.success("L'avatar a été modifié avec succès");
       window.location.reload()
      }).catch(err => {
          console.log(err);
          NotificationManager.error("L'avatar n'a pas pu etre modifié");
      }).finally(() => {
          this.setState({ notif: null, showBox: false });
          this.props.setRequestGlobalAction(false);
      });
  };


   render() {
      
      const { authUser} = this.props;
      const { activeTab , show} = this.state;
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
                  shouldEdit={this.handleOnClick}
                  userAvatar= {authUser.user.avatar}
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
                        <Tab
                           icon={<i className="ti-email"></i>}
                           label={<IntlMessages id="auth.password" />}
                        />
                        {/*<Tab
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
                        <UpdateAdress/>
                     </TabContainer>}
                 {activeTab === 2 &&
                     <TabContainer>
                        <UpdatePassword />
                     </TabContainer>}
                   {/*activeTab === 3 &&
                     <TabContainer>
                        <Address />
                  </TabContainer>*/}
               </div>
            </RctCard>
            <Dialog
                    open={show}
                    onClose={() => this.setState({ show: false })}
                    aria-labelledby="responsive-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth={'lg'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Nouvel Avatar
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => this.setState({ show: false })}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <RctCollapsibleCard>
                            <div className="row">
                                
                                
                                <div className="col-12 my-3">
                                    <FormGroup>
                                        <InputLabel className="text-left">
                                           Choisir une nouvelle image
                                        </InputLabel>
                                        <Input
                                            id="File"
                                            type="file"
                                            name="avatar"
                                            onChange={event => this.setState({ avatar: event.target.files[0] })}
                                        />
                                    </FormGroup>
                                </div>
                                <FormGroup className="mb-15">
                                    <Button
                                        // type="submit"
                                        color="primary"
                                        variant="contained"
                                        className="text-white font-weight-bold mr-3"
                                        onClick={() => this.createPiece()}
                                    >
                                       Modifier
                                    </Button>
                                </FormGroup>
                            </div>
                        </RctCollapsibleCard>
                    </DialogContent>
                </Dialog>
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