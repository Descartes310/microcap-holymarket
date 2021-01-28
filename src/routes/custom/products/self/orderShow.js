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
import { getSaleProducts } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import Button from "@material-ui/core/Button";
import TimeFromMoment from "Components/TimeFromMoment";

class OrderShow extends Component {

    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.sale = this.props.match.location?.state.sale
        ? JSON.parse(this.props.match.location?.state.sale)
        : null;
        this.state = {
            loading: true,
            product: {order: {orderItems: []}}
        }
    }

    componentDidMount() {
        console.log('Je suis ici !')
        this.loadData();
    }

    loadData = () => {
        getSaleProducts(this.props.match.params.id)
            .then(product => {
                console.log(product)
                this.setState({ product });
            })
            .catch((err) => {
                console.log("Error => ", err)
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ loading: false }));
    };
    render() {
        const { sale, product } = this.state;

        return (
            <>
                <CustomList
                    loading={false}
                    list={product.order.orderItems}
                    titleList={"Produits de la commande "+product.Name}
                    itemsFoundText={n => `${n} produit trouvés`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun produits trouvés dans la commande
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
                                                    <th>Prix unitaire</th>
                                                    <th>Quantité</th>
                                                    <th>Prix total</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.typeProduct.label}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.typeProduct.defaultPrice}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.quantity}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.quantity * item.typeProduct.defaultPrice}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="table-action">
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                variant="contained"
                                                                className={"text-white font-weight-bold mr-3 bg-blue"}
                                                            >
                                                                Details du produit
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
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(OrderShow))));
