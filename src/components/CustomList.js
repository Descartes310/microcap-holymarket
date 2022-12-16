import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core";
import Permission from "Enums/Permissions.tsx";
import { AbilityContext } from "Permissions/Can";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import { canArray, globalSearch } from "Helpers/helpers";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import FetchFailedComponent from "Components/FetchFailedComponent";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { permissionMiddleware } from "Actions/PermissionAlertBoxAction";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

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

        this.setState({ searched: event.target.value });
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
            titleList, itemsFoundText, addingButton,
            loading, list, error, renderItem, style,
            match, history, classes, showSearch, onRetryClick,
            addText, onAddClick, addPermissions, searchPermissions,
            showBackBtn, titleClassName, wrapClassName, rightComponent
        } = this.props;

        let orderedItems = this.handleSearch(this.state.searched, list);

        const canAdd = canArray(this.mapPermissions(addPermissions.permissions), addPermissions.some);
        const canSearch = canArray(this.mapPermissions(searchPermissions.permissions), searchPermissions.some);

        return (
            <div className={`page-list ${wrapClassName}`} style={style}>
                {titleList && (
                    <PageTitleBar
                        match={match}
                        title={titleList}
                        history={history}
                        enableBreadCrumb={false}
                        showBackBtn={showBackBtn}
                        titleClassName={titleClassName}
                    />
                )}
                {loading
                    ? (<RctSectionLoader />)
                    : orderedItems === null ? (
                        <FetchFailedComponent _onRetryClick={onRetryClick} />
                    ) : (
                            <RctCollapsibleCard>
                                <div className={`align-items-center mb-30 px-15 row ${rightComponent && 'justify-content-between'} `}>
                                    {(onAddClick && canAdd && !addingButton) && (
                                        <Button
                                            color="primary"
                                            className="text-white mr-2"
                                            onClick={() => onAddClick()}
                                        >
                                            {addText}
                                            <i className="zmdi zmdi zmdi-plus ml-2" />
                                        </Button>
                                    )}
                                    {showSearch && (
                                        <>
                                            <div>
                                                <FormControl>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">
                                                            <IconButton aria-label="facebook">
                                                                <i className="zmdi zmdi-search" />
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
                                        </>
                                    )}
                                    {!rightComponent ? (
                                        <>
                                            {itemsFoundText && (
                                                <p className={classes.title}>
                                                {itemsFoundText(orderedItems.length)}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <div className="d-flex align-items-center">
                                            {rightComponent()}
                                        </div>
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
    titleList: PropTypes.string,
    renderItem: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    showSearch: PropTypes.bool,
    list: PropTypes.any,
    error: PropTypes.any,
    itemsFoundText: PropTypes.func,
    onRetryClick: PropTypes.func,
    showBackBtn: PropTypes.bool,
    wrapClassName: PropTypes.string,
    titleClassName: PropTypes.string,
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
    showSearch: true,
    showBackBtn: true,
    titleClassName: '',
    wrapClassName: '',
};

export default withRouter(connect(() => ({}), {
    permissionMiddleware
})(withStyles(useStyles, { withTheme: true })(CustomList)));
