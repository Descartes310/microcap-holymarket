import React, { Component, Fragment } from 'react';
import { Badge, Button, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

// intl messages
import { connect } from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import _ from 'lodash';
import Create from './Create';
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { globalSearch } from "Helpers/helpers";
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { NotificationManager } from "react-notifications";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { getCategoryProducts, setRequestGlobalAction, setActiveCatalog } from "Actions";

class CategoryProductsList extends Component {
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
        this.props.getCategoryProducts(this.props.authUser.user.branch.id);
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

    render() {
        const { categoryProducts, loading, error, classes } = this.props;
        const { showCreateBox } = this.state;

        let orderedItems = this.handleSearch(this.state.searched, categoryProducts);

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
                                itemsFoundText={n => `${n} catégorie.s trouvée.s`}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucune catégorie trouvée
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
                                                        {list && list.map((category, key) => (
                                                            <tr key={key} onClick={() => this.handleOnRowClick(category.id)} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-left media-middle mr-15">
                                                                            {/*<img src={category.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                        </div>
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{category.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{category.description}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="table-action">
                                                                    <IconButton
                                                                        edge="start"
                                                                        className={classes.menuButton + ` ${category.available ? 'text-blue' : 'text-black'}`}
                                                                        color="inherit"
                                                                        aria-label="menu">
                                                                        {category.available ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
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
                            <Create
                                show={showCreateBox}
                                categoryProducts={categoryProducts}
                                onClose={() => this.setState({ showCreateBox: false })}
                            />
                        </>
                    )
                }
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, categoryProducts, authUser }) => {
    return {
        requestGlobalLoader,
        loading: categoryProducts.loading,
        categoryProducts: categoryProducts.data,
        error: categoryProducts.error,
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

export default connect(mapStateToProps, { getCategoryProducts, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(CategoryProductsList))));
