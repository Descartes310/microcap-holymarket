import React, { Component, Fragment } from 'react';
import { Badge, Button, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

// intl messages
import { connect } from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import { getCatalogsOfOneType, setRequestGlobalAction, setActiveCatalog } from "Actions";
import { injectIntl } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import NetworkBranchIntlMessages from "Components/NetworkBranchIntlMessages";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import _ from 'lodash';
import Product from "Enums/Product";
import { CATALOG, joinUrlWithParams, NETWORK } from "Url/frontendUrl";
import Switch from "@material-ui/core/Switch/Switch";
import SweetAlert from "react-bootstrap-sweetalert";
import { NotificationManager } from "react-notifications";
import { globalSearch } from "Helpers/helpers";
import { withStyles } from "@material-ui/core";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CatalogCreate from "Routes/custom/products/Create";
import { withRouter } from "react-router-dom";

class CatalogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'withParent',
            searched: '',
            showWarningBox: false,
            catalogId: null,
            showCreateBox: false,
        }
    }

    componentDidMount() {
        this.props.getCatalogsOfOneType(Product.PRODUCT, this.props.authUser.user.branch.id);
    }

    handleOrder = (value, data) => {
        if (value !== 'none') {
            // Apply order feature
            // return data;
            return _.sortBy(data, 'profileParent');
        }

        return data;
    };

    handleSearch = (value, data) => {
        if (value !== '') {
            // Apply order feature
            // return data;
            return globalSearch(data, this.state.searched);
        }

        return data;
    };

    handleActiveChange = (catalogId) => {
        this.setState({ catalogId, showWarningBox: true });
    };

    handleOnRowClick = (catalogId) => {
        // console.log("handleOnRowClick => ", catalogId);
        this.props.history.push(joinUrlWithParams(CATALOG.PRODUCT.SHOW, [{ param: 'id', value: catalogId }]));
        // this.setState({catalogId, showWarningBox: true});
    };

    handleActiveConfirmed = () => {
        this.props.setRequestGlobalAction(true);
        setActiveCatalog(this.state.catalogId)
            .then(result => {
                NotificationManager.success(this.props.intl.formatMessage({ id: 'activeCatalog.alert.successText' }));
                this.props.getCatalogsOfOneType(Product.PRODUCT, this.props.authUser.user.branch.id);
                this.setState({ showWarningBox: false });
            })
            .catch(() => {
                NotificationManager.error(this.props.intl.formatMessage({ id: 'error.500' }));
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    render() {
        const { catalogTypes, loading, error, classes } = this.props;
        const { showWarningBox, catalogId, searched, showCreateBox } = this.state;

        let orderedItems = this.handleSearch(this.state.searched, catalogTypes);
        // console.log("orderedItems => ", orderedItems);
        return (
            <div className="mx-4">
                {loading || orderedItems === null
                    ? (<RctSectionLoader />)
                    : (
                        <>
                            <AppBar position="static" className="bg-white px-0 mx-0">
                                <Toolbar>
                                    <Button
                                        color="primary"
                                        className="mb-10 text-white mr-2"
                                        onClick={() => this.setState({ showCreateBox: true })}
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
                                                    name="search"
                                                    placeholder={this.props.intl.formatMessage({ id: 'widgets.search' }) + '...'}
                                                    type="text"
                                                    onChange={event => this.setState({ searched: event.target.value })}
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    </div>
                                    <p className={classes.title}>
                                        <NetworkBranchIntlMessages id="catalog.found" values={{ count: orderedItems.length }} />
                                    </p>
                                </Toolbar>
                            </AppBar>
                            <CatalogCreate
                                show={showCreateBox}
                                onClose={() => {
                                    this.setState({ showCreateBox: false });
                                }}
                                catalog={{ value: Product.PRODUCT, displayName: this.props.intl.formatMessage({ id: "sidebar.product" }) }}
                            />
                            {orderedItems.length === 0
                                ? (
                                    <RctCollapsibleCard>
                                        <IntlMessages id="list.noThingToDisplay" values={{ thing: this.props.intl.formatMessage({ id: 'catalog' }) }} />
                                    </RctCollapsibleCard>
                                )
                                : (
                                    <>
                                        <div className="table-responsive">
                                            <table className="table table-hover table-middle mb-0 text-center">
                                                <thead>
                                                    <tr>
                                                        <th><IntlMessages id="components.name" /></th>
                                                        <th><IntlMessages id="widgets.description" /></th>
                                                        <th><IntlMessages id="widgets.action" /></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderedItems && orderedItems.map((catalog, key) => (
                                                        <tr key={key} onClick={() => this.handleOnRowClick(catalog.id)} className="cursor-pointer">
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-left media-middle mr-15">
                                                                        {/*<img src={catalog.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                    </div>
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{catalog.label}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{catalog.description}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="table-action">
                                                                <Switch
                                                                    checked={catalog.active}
                                                                    onChange={() => this.handleActiveChange(catalog.id)}
                                                                    aria-label="checkedA"
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <SweetAlert
                                                type="danger"
                                                showCancel
                                                showConfirm
                                                show={showWarningBox}
                                                title={this.props.intl.formatMessage({ id: "activeCatalog.alert.title" })}
                                                customButtons={(
                                                    <>
                                                        <Button
                                                            color="blue"
                                                            variant="outlined"
                                                            onClick={() => this.setState({ showWarningBox: false })}
                                                            className="text-white bg-blue font-weight-bold mr-3"
                                                        >
                                                            <IntlMessages id="button.cancel" />
                                                        </Button>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => this.handleActiveConfirmed(catalogId)}
                                                        >
                                                            <IntlMessages id="button.activate" />
                                                        </Button>
                                                    </>
                                                )}
                                                onConfirm={() => this.handleActiveConfirmed(catalogId)}
                                            >
                                                <IntlMessages id="activeCatalog.alert.text" />
                                            </SweetAlert>
                                        </div>
                                    </>)}
                        </>
                    )
                }
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, catalogTypes, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data, loading: catalogTypes.loading, catalogTypes: catalogTypes.data, error: catalogTypes.error }
};

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

export default connect(mapStateToProps, { getCatalogsOfOneType, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(CatalogList))));
