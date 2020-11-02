import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import {withStyles} from "@material-ui/core";
import {canArray, globalSearch} from "Helpers/helpers";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {permissionMiddleware} from "Actions/PermissionAlertBoxAction";
import {AbilityContext} from "Permissions/Can";
import Permission from "Enums/Permissions";

class CustomList extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.state = {
            searched: '',
        }
    }

    onSearchChanged = (event, can) => {
        if (this.props.permissionMiddleware(can)) return;

        this.setState({searched: event.target.value});
    };

    handleSearch = (value, data) => {
        if (value !== '') {
            // Apply order feature
            return globalSearch(data, this.state.searched);
        }

        return data;
    };

    mapPermissions = permissions => permissions.map(p => this.context.can(p, Permission));

    render() {
        const {
            match, history, classes,
            titleList, itemsFoundText,
            loading, list, error, renderItem,
            addText, onAddClick, addPermissions, searchPermissions,
        } = this.props;

        let orderedItems = this.handleSearch(this.state.searched, list);

        const canAdd = canArray(this.mapPermissions(addPermissions.permissions), addPermissions.some);
        const canSearch = canArray(this.mapPermissions(searchPermissions.permissions), searchPermissions.some);

        return (
            <div className="page-list">
                <PageTitleBar title={titleList} match={match} history={history} />
                {loading || orderedItems === null
                    ? (<RctSectionLoader/>)
                    : (
                        <RctCollapsibleCard>
                            <div className="align-items-center mb-30 px-15 row">
                                {(onAddClick && canAdd) && (
                                    <Button
                                        color="primary"
                                        className="text-white mr-2"
                                        onClick={() => onAddClick()}
                                    >
                                        {addText}
                                        <i className="zmdi zmdi zmdi-plus ml-2" />
                                    </Button>
                                )}
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
                                                onChange={event => this.onSearchChanged(event, canSearch)}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </div>
                                {itemsFoundText && (
                                    <p className={classes.title}>
                                        {itemsFoundText(orderedItems.length)}
                                    </p>
                                )}
                            </div>
                            {renderItem(orderedItems)}
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

CustomList.propTypes = {
    addText: PropTypes.string,
    onAddClick: PropTypes.func,
    addPermissions: PropTypes.shape({
        permissions: PropTypes.array.isRequired,
        some: PropTypes.bool,
    }),
    searchPermissions: PropTypes.shape({
        permissions: PropTypes.array.isRequired,
        some: PropTypes.bool,
    }),
    titleList: PropTypes.string.isRequired,
    renderItem: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.any,
    error: PropTypes.any,
    itemsFoundText: PropTypes.func,
};

CustomList.defaultProps = {
    addText: "Ajouter",
    addPermissions: {
        permissions: [],
        some: true,
    },
    searchPermissions: {
        permissions: [],
        some: true,
    },
};

export default withRouter(connect(() => ({}), {
    permissionMiddleware
})(withStyles(useStyles, { withTheme: true })(CustomList)));
