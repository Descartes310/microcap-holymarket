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

import {NETWORK} from "Url/frontendUrl";

const firstList = [
    {
        'id': 3,
        'handle': NETWORK.CONFIGURATION.NETWORK_PROFILE_TYPE.LIST,
        'title': "Structure du réseau",
        'icon': 'settings'
    },
    {
        'id': 0,
        'handle': NETWORK.CONFIGURATION.NETWORK_PROFILE.LIST,
        'title': "Profile réseau",
        'icon': 'account'
    },
    {
        'id': 1,
        'handle': NETWORK.CONFIGURATION.NETWORK_PRIMARY.SELF,
        'title': "Réseau primaire",
        'icon': 'inbox'
    },
    {
        'id': 2,
        'handle': NETWORK.CONFIGURATION.ASSISTANT_CONFIGURATION.LIST,
        'title': "Assistants",
        'icon': 'settings'
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
                                    {folder.title}
								</span>
                            </ListItem>
                        ))}
                    </List>
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
