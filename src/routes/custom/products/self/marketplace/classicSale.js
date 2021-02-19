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
import {joinUrlWithParamsId, PRODUCT} from "Url/frontendUrl";

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
        const url = joinUrlWithParamsId(PRODUCT.SHOW, product.id);
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
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th><IntlMessages id="components.name" /></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-left media-middle mr-15">
                                                            {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                        </div>
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="table-action">
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        // disabled={loading}
                                                        variant="contained"
                                                        className={"text-white font-weight-bold mr-3 bg-blue"}
                                                        onClick={() => this.onEnterClick(item)}
                                                    >
                                                        Voir les propositions
                                                        <i className="zmdi zmdi-arrow-right mr-2"/>
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
