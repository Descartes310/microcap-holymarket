import { Badge } from 'reactstrap';
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {textTruncate} from "Helpers/helpers";
import IntlMessages from 'Util/IntlMessages';
import Button from '@material-ui/core/Button';
import {NOTIFICATIONS} from "Url/frontendUrl";
import Tooltip from '@material-ui/core/Tooltip';
import { Scrollbars } from 'react-custom-scrollbars';
import NotificationType from "Enums/NotificationType";
import IconButton from '@material-ui/core/IconButton';
import TimeFromMoment from "Components/TimeFromMoment";
import NotificationService from "Services/notifications";
import SingleTitleText from "Components/SingleTitleText";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

class HeaderNotifications extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: true,
         unreadCount: 0,
         notifications: []
      }
   }

   componentDidMount() {
      this.countUnread();
      this.showLastestNotifications();
   }

   countUnread = () => {
      NotificationService.countUnread()
      .then(unreadCount => this.setState({unreadCount}));
   }

   showLastestNotifications = () => {
      NotificationService.getNotifications(NotificationType.UNREAD, false, 3)
      .then(notifications => this.setState({notifications}))
      .finally(() => {
         this.setState({ loading: false })
      });
   }

   viewAll = () => {
      this.props.history.push(NOTIFICATIONS.LIST);
   };

   render() {
      const { notifications, unreadCount, loading } = this.state;
      return (
         <UncontrolledDropdown nav className="list-inline-item notification-dropdown" >
            <DropdownToggle nav className="p-0">
               <Tooltip title="Notifications" placement="bottom">
                  <IconButton className={unreadCount > 0 ? "shake" : ''} aria-label="bell">
                     <i className="zmdi zmdi-notifications-active"></i>
                     {unreadCount > 0 && (
                         <Badge color="danger" className="badge-xs badge-top-right rct-notify">
                            {unreadCount}
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
                  </div>
                  <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280}>
                     {loading ? (
                         <RctSectionLoader />
                     ) : notifications.length === 0 ? (
                         <SingleTitleText
                             text="Pas de nouvelles notifications"
                         />
                     ) : (
                         <ul className="list-unstyled dropdown-list">
                            {notifications && notifications.map((notification, index) => (
                                <li 
                                    key={index}
                                    className='-cursor-pointer'
                                    onClick={this.viewAll}
                                >
                                   <div className="media">
                                      <div className="media-body pt-5">
                                         <div className="d-flex justify-content-between">
                                            <h5 className="mb-5 text-primary">{textTruncate(notification.title, 40)}</h5>
                                             <span className="text-muted fs-5">
                                                <TimeFromMoment time={notification.createdAt} />
                                             </span>
                                         </div>
                                         <span className="text-muted fs-12 d-block">{textTruncate(notification.message, 100)}</span>
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

export default withRouter(HeaderNotifications);
