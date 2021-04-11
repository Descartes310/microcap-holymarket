import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Permission from "Enums/Permissions";
import { withRouter, Link } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { PRODUCT, joinUrlWithParamsId } from 'Url/frontendUrl'
import { setRequestGlobalAction } from "Actions";
import { getUserSales, getUnapprovedOrders } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import Button from "@material-ui/core/Button";
import TimeFromMoment from "Components/TimeFromMoment";
import AmountCurrency from "Components/AmountCurrency";

class Order extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            products: []
        }
    }

    onEnterClick = (product) => {
        const url = joinUrlWithParamsId(PRODUCT.ORDERS_SHOW, product.id);
        this.props.history.push(url);
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        setRequestGlobalAction(true);
        getUnapprovedOrders()
            .then(products => {
                this.setState({ products: products });
            })
            .catch((error) => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => {
                setRequestGlobalAction(false)
            });
    };
    render() {
        const { loading, products } = this.state;

        return (
            <>
                <CustomList
                    loading={false}
                    list={products}
                    titleList={"Commandes en attentes"}
                    itemsFoundText={n => `${n} commandes trouvées`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune commandes trouvées
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Numéro</th>
                                                    <th>Montant</th>
                                                    <th>Date de commande</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">
                                                                        <AmountCurrency amounts={item.orderItems.map((e) => {
                                                                            return { amount: e.typeProduct.price, currency: e.typeProduct.product ? e.typeProduct.product.priceCurrency : e.typeProduct.package1.currency, quantity: e.quantity }
                                                                        })} />
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">
                                                                        <TimeFromMoment time={item.updatedAt} showFullDate />
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <div className="media">
                                                                {item.orderStatus == 'PAID' ?
                                                                    <span style={{ backgroundColor: 'rgba(61, 146, 61, 1)', border: 5, width: 76, padding: 5, borderRadius: 5, color: 'white' }}>
                                                                        Payée
                                                                    </span> :
                                                                    item.orderStatus == 'NOT_PAID' ?
                                                                    <span style={{ backgroundColor: 'rgba(200, 0, 0, 0.5)', border: 5, padding: 5, width: 76, borderRadius: 5, color: 'white' }}>
                                                                        Non payée
                                                                    </span> :
                                                                    <span style={{ backgroundColor: '#ffc107', border: 5, padding: 5, width: 76, borderRadius: 5, color: 'white' }}>
                                                                        En cours
                                                                    </span>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="table-action">
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                variant="contained"
                                                                className={"text-white font-weight-bold mr-3 bg-blue"}
                                                                onClick={() => this.onEnterClick(item)}
                                                            >
                                                                Voir les détails
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
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(Order))));
