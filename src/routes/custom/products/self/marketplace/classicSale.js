import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import Permission from "Enums/Permissions";
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {withStyles} from "@material-ui/core";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {getProducts, setRequestGlobalAction} from "Actions";
import Button from "@material-ui/core/Button";
import {joinUrlWithParams, PRODUCT} from "Url/frontendUrl";
import {
	InstantSearch,
	Hits,
	Stats,
	SortBy,
	Pagination,
	Configure,
	MenuSelect,
	Panel,
	SearchBox
} from 'react-instantsearch-dom';
import Hit from './Hit';

class ClassicSale extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getProducts(this.props.authUser.user.branch.id, 'CLASSIC_SALE');
    }

    onEnterClick = (product) => {
        let url = joinUrlWithParams(PRODUCT.SHOW, [{param: 'id', value: product.id}, {param: 'type', value: product.type}]);
        this.props.history.push(url, {currentProduct: JSON.stringify(product)});
    };

    render() {
        const { products, loading, error } = this.props;

        return (
            <>
                <CustomList
                    error={error}
                    loading={loading}
                    list={products}
                    // titleList={"Produits"}
                    itemsFoundText={n => `${n} produits trouvés`}
                    addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun produits trouvés
                                    </h4>
                                </div>
                            ) : (
                                <div className="row">
                                        {list && list.map((item, key) => (
                                            <div className="col-sm-4 col-md-3 col-lg-2 mb-20 ">
                                                <Hit 
                                                    hit={item}
                                                    onPressViewProposition={this.onEnterClick}
                                                />
                                            </div>      
                                        ))}   
                                </div>
                            )}
                        </>
                    )}
                />
            </>
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
const mapStateToProps = ({ requestGlobalLoader, products, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: products.loading,
        products: products.data,
        error: products.error
    }
};

export default connect(mapStateToProps, {getProducts, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(ClassicSale))));
