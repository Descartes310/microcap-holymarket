/**
 * Email Listing
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

// redux action
import { readEmail, onSelectEmail, markAsStarEmail, getUsers } from 'Actions';

// component
import ListItem from './ListItem';

//Intl Message
import IntlMessages from 'Util/IntlMessages';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import Toolbar from "@material-ui/core/Toolbar";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {USERS} from "Url/frontendUrl";
import {withStyles} from "@material-ui/core";
import {globalSearch} from "Helpers/helpers";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {permissionMiddleware} from "Actions/PermissionAlertBoxAction";
import {AbilityContext} from "Permissions/Can";
import Permission from "Enums/Permissions";

class UserList extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.state = {
            searched: '',
        }
    }

    componentDidMount() {
        this.props.getUsers(this.props.authUser.branchId, this.props.authUser.userType);
    }

    onSearchChanged = (event) => {
        if (this.props.permissionMiddleware(this.props.authUser.hasPermissions([
            Permission.navLinks.users.viewMenu.name,
            Permission.users.search.name
        ], false))) return;

        this.setState({searched: event.target.value});
    };

    onAddClick = () => {
        if (this.props.permissionMiddleware(this.context.can(Permission.users.createOne.name, Permission))) return;

        this.props.history.push(USERS.USERS.CREATE);
    };

    handleSearch = (value, data) => {
        if (value !== '') {
            // Apply order feature
            return globalSearch(data, this.state.searched);
        }

        return data;
    };

    render() {
        const { loading, users, history, classes } = this.props;

        let orderedItems = this.handleSearch(this.state.searched, users);

        return (
            <div className="page-list">
                <PageTitleBar title={"Utilisateurs"} match={this.props.match} history={history} />
                {loading || orderedItems === null
                    ? (<RctSectionLoader/>)
                    : (
                        <RctCollapsibleCard>
                            <div className="align-items-center mb-30 px-15 row">
                                <Button
                                    color="primary"
                                    className="text-white mr-2"
                                    onClick={this.onAddClick}
                                >
                                    <IntlMessages id="button.add" />
                                    <i className="zmdi zmdi zmdi-plus ml-2" />
                                </Button>
                                <div className={classes.flex}>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <IconButton aria-label="facebook">
                                                    <i className="zmdi zmdi-search"></i>
                                                </IconButton>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="search"
                                                value={this.state.searched}
                                                placeholder={'Recherchez...'}
                                                onChange={event => this.onSearchChanged(event)}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </div>
                                <p className={classes.title}>
                                    {orderedItems.length} utilisateur(s) trouvé(s)
                                </p>
                            </div>
                            <>
                                <ul className="list-unstyled m-0">
                                    {/*{(emails && emails.length > 0 && emails !== null) ? emails.map((email, key) => (*/}
                                    {(orderedItems && orderedItems.length > 0) ? orderedItems.map((user, key) => (
                                            <ListItem
                                                user={user}
                                                key={key}
                                                onSelectEmail={(e) => this.onSelectEmail(e, user)}
                                                onReadEmail={() => this.readEmail(user)}
                                            />
                                        ))
                                        :
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun utilisateurs trouvés
                                            </h4>
                                        </div>
                                    }
                                </ul>
                            </>
                        </RctCollapsibleCard>
                    )
                }
            </div>
        );
    }
}

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

// map state to props
const mapStateToProps = ({ requestGlobalLoader, users, authUser }) => {
    return {loading: requestGlobalLoader && users.loading, users: users.data, error: users.error, authUser: authUser.data};
};

export default withRouter(connect(mapStateToProps, {
    getUsers,
    readEmail,
    onSelectEmail,
    markAsStarEmail,
    permissionMiddleware
})(withStyles(useStyles, { withTheme: true })(UserList)));
