import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Permission from "Enums/Permissions";
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from "Actions";
import { getOneProductTypeFullInfos } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import Button from "@material-ui/core/Button";
import TimeFromMoment from "Components/TimeFromMoment";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import AmountCurrency from "Components/AmountCurrency";
import { joinUrlWithParams, PRODUCT } from "Url/frontendUrl";
// import { Button } from "reactstrap";

class ProductDetails extends Component {

    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: this.props.match.params.id,
            type: this.props.match.params.type,
            product: { product: { defaultPrice: 0, label: 'XXX', description: 'XXX', isAccount: false, unit: null, minBalance: 0, maxBalance: 0, priceCurrency: 'EUR' }, products: [], accounts: [] }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getOneProductTypeFullInfos(this.state.id, this.state.type)
            .then(product => {
                this.setState({ product });
            })
            .catch((err) => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ loading: false }));
    };

    getType = (type) => {
        switch (type) {
            case 'PRODUCT':
                return 'produit'
            case 'PACKAGE':
                return 'package'
            case 'CONSOLIDATED':
                return 'compte de consolidation'
            default:
                return 'produit'
        }
    }

    onEnterClick = (product) => {
        this.setState({ id: product.id, type: 'PRODUCT' }, () => {
            let url = joinUrlWithParams(PRODUCT.DETAILS, [{ param: 'id', value: product.id }, { param: 'type', value: 'PRODUCT' }]);
            this.props.history.push(url);
            this.loadData();
        })
    };

    render() {
        const { product } = this.state;
        const { match, history } = this.props;

        return (
            <RctCollapsibleCard>
                <PageTitleBar title={`Détails du ${this.getType(product.type)} ${product.product.label}`} match={match} history={history} enableBreadCrumb={true} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 50
                }}>
                    <div style={{ flex: 3 }}>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Description du {this.getType(product.type)}</h2>
                            <span>{product.product.description}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Prix du {this.getType(product.type)}</h2>
                            <span>{product.type != 'PACKAGE' ? <AmountCurrency amount={product.product.defaultPrice} from={product.product.priceCurrency} /> :
                                <AmountCurrency amounts={product.products.map((e) => {
                                    return { amount: e.price, currency: e.currency, quantity: e.quantity }
                                })} />
                            }</span>
                        </div>
                        {
                            product.type != 'PACKAGE' && product.product.isAccount ?
                                <>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Planché du {this.getType(product.type)}</h2>
                                        <span><AmountCurrency amount={product.product.minBalance} from={product.product.priceCurrency} unit={product.product.unit} /></span>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Plafond du {this.getType(product.type)}</h2>
                                        <span><AmountCurrency amount={product.product.maxBalance} from={product.product.priceCurrency} unit={product.product.unit} /> </span>
                                    </div>
                                </>
                                : null
                        }
                    </div>
                    <div style={{ flex: 1 }}>
                        <img src={product.product.image ? product.product.image : 'https://www.saunierdecamargue.fr/sites/default/files/image-not-found.jpg'} alt="Product image" className="mr-30 bordered" width="300" height="300" />  
                    </div>
                </div>
                <h1 style={{ marginTop: 40 }}>Liste des produits associés</h1>
                <CustomList
                    loading={false}
                    list={product.products}
                    itemsFoundText={n => `${n} produit disponibles`}
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
                                                    <th>Description</th>
                                                    <th>Prix unitaire</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => {
                                                    console.log(item)
                                                    return (
                                                        <tr key={key} className="cursor-pointer">
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{product.type != 'PACKAGE' ? item.label : item.typeProduct.label}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{product.type != 'PACKAGE' ? item.description : item.typeProduct.description}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark"><AmountCurrency amount={product.type != 'PACKAGE' ? item.defaultPrice : item.price} from={product.type != 'PACKAGE' ? item.priceCurrency : item.currency} /> {product.type == 'PACKAGE' ? ` x ${item.quantity}` : null}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <Button
                                                                            size="small"
                                                                            color="primary"
                                                                            // disabled={loading}
                                                                            variant="contained"
                                                                            className={"text-white font-weight-bold mr-3 bg-blue"}
                                                                            onClick={() => this.onEnterClick(product.type != 'PACKAGE' ? item : item.typeProduct)}
                                                                        >
                                                                            Voir les détails
                                                                            <i className="zmdi zmdi-arrow-right mr-2" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                        </>
                    )}
                />
                {product.type == 'CONSOLIDATED' ?
                    <>
                        <h1 style={{ marginTop: 40 }}>Liste des comptes agrégés</h1>
                        <CustomList
                            loading={false}
                            list={product.accounts}
                            itemsFoundText={n => `${n} comptes disponibles`}
                            renderItem={list => (
                                <>
                                    {list && list.length === 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun comptes trouvés
                                    </h4>
                                        </div>
                                    ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0 text-center">
                                                    <thead>
                                                        <tr>
                                                            <th><IntlMessages id="components.name" /></th>
                                                            <th>Description</th>
                                                            <th>Prix unitaire</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.type != 'PACKAGE' ? item.label : item.typeProduct.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.type != 'PACKAGE' ? item.description : item.typeProduct.description}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark"><AmountCurrency amount={item.defaultPrice} from={item.priceCurrency} /></h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">
                                                                                <Button
                                                                                    size="small"
                                                                                    color="primary"
                                                                                    // disabled={loading}
                                                                                    variant="contained"
                                                                                    className={"text-white font-weight-bold mr-3 bg-blue"}
                                                                                    onClick={() => this.onEnterClick(item)}
                                                                                >
                                                                                    Voir les détails
                                                                                    <i className="zmdi zmdi-arrow-right mr-2" />
                                                                                </Button>
                                                                            </h4>
                                                                        </div>
                                                                    </div>
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
                    : null}
            </RctCollapsibleCard>
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
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(ProductDetails))));
