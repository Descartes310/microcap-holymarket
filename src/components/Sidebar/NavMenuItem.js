/**
 * Nav Menu Item
 */
import React, { Fragment, Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import NetworkBranchIntlMessages from "Components/NetworkBranchIntlMessages";

class NavMenuItem extends Component {

   state = {
      subMenuOpen: '',
      /*activeMenu: ''*/
   }
	/**
   * On Toggle Collapse Menu
   */
   onToggleCollapseMenu(index) {
      if (this.state.subMenuOpen === '') {
         this.setState({
            subMenuOpen: index
         })
      }
      else if (this.state.subMenuOpen !== index) {
         this.setState({
            subMenuOpen: index
         })
      }
      else {
         this.setState({ subMenuOpen: '' });
      }
   }

   /*onActiveMenu(index) {
      if (this.state.activeMenu === '') {
         this.setState({
            activeMenu: index
         })
      }
      else if (this.state.activeMenu !== index) {
         this.setState({
            activeMenu: index
         })
      }
      else {
         this.setState({ activeMenu: '' });
      }

   }*/

   render() {
      const { menu, onToggleMenu, authUser } = this.props;
      const { subMenuOpen } = this.state;

      // Check if the route has nested routes and if the user has at least one permission for one nested routes
      if (menu.child_routes !== null && authUser.hasPermissions(_.flattenDeep(menu.child_routes.map(p => p.permissions.map(i => i.name))))) {
         return (
             <Fragment>
                <ListItem button component="li" onClick={onToggleMenu} className={`list-item ${classNames({ 'item-active': menu.open })}`}>
                   <ListItemIcon className="menu-icon">
                      <i className={menu.menu_icon}></i>
                   </ListItemIcon>
                   <span className="menu text-capitalize">
                     {/*<IntlMessages id={menu.menu_title} />*/}
                      {menu.menu_title}
                  </span>
                   {menu.new_item && menu.new_item === true ?
                       <Chip label="new" className="new-item" color="secondary" />
                       :
                       ''
                   }
                </ListItem>
                <Collapse in={menu.open} timeout="auto" className="sub-menu">
                   <Fragment>
                      {menu.type_multi == null ?
                          <List className="list-unstyled py-0">
                             {authUser && menu.child_routes.map((subMenu, index) => {
                                if (authUser.hasPermissions(subMenu.permissions.map(p => p.name))) {
                                   return (
                                       <ListItem button component="li" key={index}>
                                           <NavLink to={subMenu.path} activeClassName="item-active" >
                                           <span className="menu">
                                              {/*<NetworkBranchIntlMessages id={subMenu.menu_title} />*/}
                                              {subMenu.menu_title}
                                           </span>
                                             {subMenu.new_item && subMenu.new_item === true ?
                                                 <Chip label="new" className="new-item" color="secondary" />
                                                 :
                                                 ''
                                             }
                                          </NavLink>
                                       </ListItem>
                                   )
                                }
                                return null;
                             })}
                          </List>
                          :
                          <List className="list-unstyled py-0">
                             {authUser && menu.child_routes.map((subMenu, index) => {
                                return (
                                    <Fragment key={index}>
                                        {subMenu.child_routes ? (
                                            <ListItem
                                                button
                                                component="li"
                                                onClick={() => this.onToggleCollapseMenu(index)}
                                                className={`list-item ${classNames({ 'item-active': subMenuOpen === index })}`}
                                            >
                                           <span className="">
                                              {subMenu.menu_title}
                                               {/*<NetworkBranchIntlMessages id={subMenu.menu_title} />*/}
                                               {menu.new_item && menu.new_item === true ?
                                                   <Chip label="new" className="new-item" color="secondary" />
                                                   :
                                                   null
                                               }
                                           </span>
                                            </ListItem>
                                        ) : (
                                            <ListItem button component="li" key={index}>
                                                <NavLink to={subMenu.path} activeClassName="item-active" >
                                                   <span className="menu">
                                                      {/*<NetworkBranchIntlMessages id={subMenu.menu_title} />*/}
                                                       {subMenu.menu_title}
                                                   </span>
                                                    {subMenu.new_item && subMenu.new_item === true ?
                                                        <Chip label="new" className="new-item" color="secondary" />
                                                        :
                                                        ''
                                                    }
                                                </NavLink>
                                            </ListItem>
                                        )}
                                       <Collapse in={subMenuOpen === index} timeout="auto">
                                          <List className="list-unstyled py-0">
                                             {authUser && subMenu.child_routes && subMenu.child_routes.map((nestedMenu, nestedKey) => {
                                                if (authUser.hasPermissions(nestedMenu.permissions.map(p => p.name))) {
                                                   return (
                                                       <ListItem button component="li" key={nestedKey}  onClick={() => this.onToggleCollapseMenu(index)}>
                                                          <NavLink activeClassName="item-active" to={nestedMenu.path}>
                                                            <span className="menu pl-10 d-inline-block">
                                                               {/*<NetworkBranchIntlMessages id={nestedMenu.menu_title} />*/}
                                                               {nestedMenu.menu_title}
                                                               {menu.new_item && menu.new_item === true ?
                                                                  <Chip label="new" className="new-item" color="secondary" />
                                                                  :
                                                                  null
                                                               }
                                                            </span>
                                                          </NavLink>
                                                       </ListItem>
                                                   )
                                                }

                                                return null;
                                             })}
                                          </List>
                                       </Collapse>
                                    </Fragment>
                                )
                             })}
                          </List>
                      }
                   </Fragment>
                </Collapse>
             </Fragment>
         )
      } else if (menu.child_routes === null || menu.path) {
         return (
             <ListItem button component="li">
                <NavLink activeClassName="item-active" to={menu.path}>
                   <ListItemIcon className="menu-icon">
                      <i className={menu.menu_icon}></i>
                   </ListItemIcon>
                   <span className="menu">
                  {/*<IntlMessages id={menu.menu_title} />*/}
                      {menu.menu_title}
               </span>
                </NavLink>
             </ListItem>
         );
      }

      return null;
   }
}

export default NavMenuItem;
