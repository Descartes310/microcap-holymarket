import { Button } from 'reactstrap';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import IntlMessages from 'Util/IntlMessages';
import { withRouter } from "react-router-dom";
import { globalSearch } from "Helpers/helpers";
import { withStyles } from "@material-ui/core";
import CustomList from "Components/CustomList";
import { NotificationManager } from "react-notifications";
import { PRODUCT, PRODUCT_TYPE, joinUrlWithParams } from "Url/frontendUrl";
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';
import { getProductTypes, setRequestGlobalAction, setActiveCatalog } from "Actions";

class ProductTypeList extends Component {
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
        this.props.getProductTypes(this.props.authUser.user.branch.id);
    }

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
        // this.props.history.push(joinUrlWithParams(CATALOG.PRODUCT.SHOW, [{param: 'id', value: catalogId}]));
    };

    handleActiveConfirmed = () => {
        this.props.setRequestGlobalAction(true);
        setActiveCatalog(this.state.catalogId)
            .then(result => {
                NotificationManager.success(this.props.intl.formatMessage({ id: 'activeCatalog.alert.successText' }));
                this.props.getCategoryProducts(this.props.authUser.user.branch.id);
                this.setState({ showWarningBox: false });
            })
            .catch(() => {
                NotificationManager.error(this.props.intl.formatMessage({ id: 'error.500' }));
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    onEnterClick = (product, type) => {
        let url = joinUrlWithParams(PRODUCT.DETAILS, [{ param: 'id', value: product.id }, { param: 'type', value: type }]);
        this.props.history.push(url);
    };

    render() {
        const { productTypes, loading } = this.props;

        let orderedItems = this.handleSearch(this.state.searched, productTypes);

        return (
            <div>
                {loading || orderedItems === null
                    ? (<RctSectionLoader />)
                    : (
                        <>
                            <CustomList
                                loading={loading}
                                list={orderedItems}
                                onAddClick={() => this.props.history.push(PRODUCT_TYPE.CREATE)}
                                itemsFoundText={n => `${n} type de produits trouvée.s`}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucun type de produits trouvés
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
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
                                                                    <Button
                                                                        size="small"
                                                                        color="primary"
                                                                        variant="contained"
                                                                        className={"text-white font-weight-bold mr-3 bg-blue"}
                                                                        onClick={() => this.onEnterClick(catalog, 'PRODUCT')}
                                                                    >
                                                                        Voir les détails
                                                                        <i className="zmdi zmdi-arrow-right mr-2" />
                                                                    </Button>
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
                        </>
                    )
                }
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, productTypes, authUser }) => {
    return {
        requestGlobalLoader,
        loading: productTypes.loading,
        productTypes: productTypes.data,
        error: productTypes.error,
        authUser: authUser.data,
    }
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

export default connect(mapStateToProps, { getProductTypes, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(ProductTypeList))));
