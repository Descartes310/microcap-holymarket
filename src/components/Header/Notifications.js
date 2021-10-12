/**
 * Notification Component
 */
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Badge } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {getAllNotifications, getCountUnreadNotifications} from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";
import {connect} from "react-redux";
import {NOTIFICATIONS} from "Url/frontendUrl";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import FetchFailedComponent from "Components/FetchFailedComponent";
import SingleTitleText from "Components/SingleTitleText";
import {withRouter} from "react-router-dom";
import {textTruncate} from "Helpers/helpers";

class HeaderNotifications extends Component {
   constructor(props) {
      super(props);
      this.state = {
         unreadCount: 0
      }
   }

   componentDidMount() {
      getCountUnreadNotifications(this.props.authUser.user.id)
          .then(unreadCount => this.setState({unreadCount}))
          .catch(() => null);
      this.props.getAllNotifications(this.props.authUser.user.id, 'UNREAD');
   }

   viewAll = () => {
      this.props.history.push(NOTIFICATIONS.LIST);
   };

   onNotificationClick = (id) => {

   };

   render() {
      const { loading, data, error } = this.props.notifications;
      /*if (loading) {
         return (<RctSectionLoader />)
      }*/

      return (
         <UncontrolledDropdown nav className="list-inline-item notification-dropdown">
            <DropdownToggle nav className="p-0">
               <Tooltip title="Notifications" placement="bottom">
                  <IconButton className={this.state.unreadCount > 0 ? "shake" : ''} aria-label="bell">
                     <i className="zmdi zmdi-notifications-active"></i>
                     {this.state.unreadCount > 0 && (
                         <Badge color="danger" className="badge-xs badge-top-right rct-notify">
                            {this.state.unreadCount}
                         </Badge>
                     )}
                  </IconButton>
               </Tooltip>
            </DropdownToggle>
            <DropdownMenu right>
               <div className="dropdown-content">
                  <div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
                     <span className="text-white font-weight-bold">
                        <IntlMessages id="widgets.recentNotifications" />
                     </span>
                     {/*<Badge color="warning">1 NEW</Badge>*/}
                  </div>
                  <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280}>
                     {loading ? (
                         <RctSectionLoader />
                     ) : !data ? (
                         <FetchFailedComponent _onRetryClick={() => this.props.getAllNotifications(this.props.authUser.user.id)} />
                     ) : data.length === 0 ? (
                         <SingleTitleText
                             text="Pas de nouvelle notifications pour le moment"
                         />
                     ) : (
                         <ul className="list-unstyled dropdown-list">
                            {data && data.reverse().map((notification, index) => (
                                <li key={index}>
                                   <div className="media">
                                      {/*<div className="mr-10">
                                          <img src={notification.userAvatar} alt="user profile" className="media-object rounded-circle" width="50" height="50" />
                                       </div>*/}
                                      <div className="media-body pt-5">
                                         <div className="d-flex justify-content-between">
                                            <h5 className="mb-5 text-primary">{textTruncate(notification.title, 40)}</h5>
                                            <span className="text-muted fs-12">{notification.createdAt.fromNow()}</span>
                                         </div>
                                         <span className="text-muted fs-12 d-block">{textTruncate(notification.message, 100)}</span>
                                         {/* <Button className="btn-xs pl-0">
                                             <i className="zmdi zmdi-eye mr-2" /> Marqué comme lu
                                          </Button> */}
                                          {/*<Button className="btn-xs">
                                             <i className="zmdi zmdi-thumb-up mr-2"/> <IntlMessages id="button.like" />
                                          </Button>*/}
                                      </div>
                                   </div>
                                </li>
                            ))}
                         </ul>
                     )}
                  </Scrollbars>
               </div>
               <div className="dropdown-foot p-2 bg-white rounded-bottom">
                  <Button
                     color="primary"
                     variant="contained"
                     className="mr-10 btn-xs bg-primary text-white"
                     onClick={this.viewAll}
                  >
                     <IntlMessages id="button.viewAll" />
                  </Button>
               </div>
            </DropdownMenu>
         </UncontrolledDropdown>
      );
   }
}

export default connect(({notifications, authUser}) => ({notifications, authUser: authUser.data}), {getAllNotifications})
(withRouter(HeaderNotifications));
