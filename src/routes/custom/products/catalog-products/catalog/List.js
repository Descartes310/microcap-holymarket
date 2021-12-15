import _ from 'lodash';
import { Button } from 'reactstrap';
import Product from "Enums/Product";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { injectIntl } from "react-intl";
import IntlMessages from 'Util/IntlMessages';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { globalSearch } from "Helpers/helpers";
import { withStyles } from "@material-ui/core";
import SweetAlert from "react-bootstrap-sweetalert";
import Switch from "@material-ui/core/Switch/Switch";
import IconButton from "@material-ui/core/IconButton";
import { NotificationManager } from "react-notifications";
import CatalogCreate from "Routes/custom/products/Create";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { CATALOG, joinUrlWithParams } from "Url/frontendUrl";
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';
import { getCatalogsOfOneType, setRequestGlobalAction, setActiveCatalog } from "Actions";

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

    handleShowClick = (catalogId) => {
        this.props.history.push(joinUrlWithParams(CATALOG.PRODUCT.SHOW, [{ param: 'id', value: catalogId }]));
    };

    handleProductsClick = (catalogId) => {
        this.props.history.push(joinUrlWithParams(CATALOG.PRODUCT.PRODUCTS, [{ param: 'id', value: catalogId }]));
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
        const { catalogTypes, loading, classes } = this.props;
        const { showWarningBox, catalogId, showCreateBox } = this.state;

        let orderedItems = this.handleSearch(this.state.searched, catalogTypes);

        return (
            <div>
                {loading || orderedItems === null
                    ? (<RctSectionLoader />)
                    : (
                        <>
                            <CustomList
                                loading={loading}
                                list={orderedItems}
                                onAddClick={() => this.setState({ showCreateBox: true })}
                                itemsFoundText={n => `${n} catalogues trouvés`}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucun catalogue trouvés
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th><IntlMessages id="components.name" /></th>
                                                            <th><IntlMessages id="widgets.description" /></th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((catalog, key) => (
                                                            <tr key={key} className="cursor-pointer">
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
                                                                <td className="table-action">
                                                                    <IconButton
                                                                        edge="start"
                                                                        onClick={() => this.handleProductsClick(catalog.id)}
                                                                        className={classes.menuButton + `text-black`}
                                                                        color="inherit"
                                                                        aria-label="menu">
                                                                        <VisibilityIcon />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        edge="start"
                                                                        onClick={() => this.handleShowClick(catalog.id)}
                                                                        className={classes.menuButton + `text-black`}
                                                                        color="inherit"
                                                                        aria-label="menu">
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                            <CatalogCreate
                                show={showCreateBox}
                                onClose={() => {
                                    this.setState({ showCreateBox: false });
                                }}
                                catalog={{ value: Product.PRODUCT, displayName: this.props.intl.formatMessage({ id: "sidebar.product" }) }}
                            />
                            <SweetAlert
                                type="warning"
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
