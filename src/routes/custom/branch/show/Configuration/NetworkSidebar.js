/**
 * Email App Sidebar
 * Used To Filter Mail List
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

// helpers
import { getAppLayout } from 'Helpers/helpers';

// actions
import { filterEmails } from 'Actions';

//Intl Message
import IntlMessages from 'Util/IntlMessages';
import NetworkBranchIntlMessages from "Components/NetworkBranchIntlMessages";
import {NETWORK} from "Url/frontendUrl";

const firstList = [
    {
        'id': 0,
        'handle': NETWORK.CONFIGURATION.NETWORK_PROFILE.LIST,
        'title': 'branch.profile',
        'icon': 'settings'
    },
    {
        'id': 1,
        'handle': NETWORK.CONFIGURATION.NETWORK_PRIMARY.SELF,
        'title': 'branch.primary',
        'icon': 'inbox'
    },
];

/*const secondList = [
    {
        'id': 0,
        'handle': 'catalog',
        'title': 'general.catalog',
        'icon': 'book'
    },
];*/

class NetworkSidebar extends Component {

    /**
     * Navigate To Folder Emails
     */
    navigateTo(route) {
        const { match, history } = this.props;
        history.push(route);
    }

    /**
     * Filter Emails
     */
    filterEmails(label) {
        this.props.filterEmails(label);
    }

    /**
     * Get Scroll Height
     */
    getScrollHeight() {
        const { location } = this.props;
        const appLayout = getAppLayout(location)
        switch (appLayout) {
            case 'app':
                return 'calc(100vh - 288px)';
            case 'agency':
                return 'calc(100vh - 416px)';
            case 'boxed':
                return 'calc(100vh - 416px)';
            case 'horizontal':
                return 'calc(100vh - 333px)';
            default:
                break;
        }
    }

    render() {
        const { folders, selectedFolder, labels } = this.props;
        return (
            <Scrollbars
                className="rct-scroll"
                autoHide
                style={{ height: 'calc(100vh - 288px)' }}
            >
                <div className="sidebar-filters-wrap">
                    <List className="p-0 filters list-unstyled">
                        {firstList.map((folder, key) => (
                            <ListItem
                                button
                                key={key}
                                onClick={() => this.navigateTo(folder.handle)}
                                className={classnames({ 'item-active': selectedFolder === folder.id })}>
                                <i className={`mr-20 zmdi zmdi-${folder.icon}`} />
                                <span className="filter-title">
									<IntlMessages id={folder.title} />
								</span>
                            </ListItem>
                        ))}
                    </List>
                    {/*<h6 className="sidebar-title px-20 pt-20">
                        <NetworkBranchIntlMessages id="branch" />
                    </h6>
                    <List className="p-0 filters list-unstyled">
                        {secondList.map((folder, key) => (
                            <ListItem
                                button
                                key={key}
                                onClick={() => this.navigateTo(folder.handle)}
                                className={classnames({ 'item-active': selectedFolder === folder.id })}>
                                <i className={`mr-20 zmdi zmdi-${folder.icon}`} />
                                <span className="filter-title">
									<IntlMessages id={folder.title} />
								</span>
                            </ListItem>
                        ))}
                    </List>*/}
                </div>
            </Scrollbars>
        );
    }
}

// map state to props
const mapStateToProps = ({ emailApp }) => {
    return emailApp;
};

export default withRouter(connect(mapStateToProps, {
    filterEmails
})(NetworkSidebar));
