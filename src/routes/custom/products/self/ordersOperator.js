import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { getFilePath } from "Helpers/helpers";
import { withStyles } from "@material-ui/core";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from "Actions";
import { AbilityContext } from "Permissions/Can";
import CancelIcon from '@material-ui/icons/Cancel';
import { withRouter, Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import TimeFromMoment from "Components/TimeFromMoment";
import AmountCurrency from "Components/AmountCurrency";
import { PRODUCT, joinUrlWithParamsId } from 'Url/frontendUrl'
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import { getOrderPieces, getOperatorsOrders, approveOrder } from "Actions/independentActions";
import EmptyResult from "Components/EmptyResult";

class Order extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pieces: [],
            showBox: false,
            products: [],
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({loading: true});
        getOperatorsOrders()
            .then(products => {
                this.setState({ products: products });
            })
            .catch(() => this.setState({ products: null }))
            .finally(() => {
                this.setState({loading: false});
            });
    };

    loadPieces = (id) => {
        this.props.setRequestGlobalAction(true);
        getOrderPieces(id)
            .then(pieces => {
                this.setState({ pieces, showBox: true });
            })
            .finally(() => {
                this.props.setRequestGlobalAction(false);
            });
    };

    approvingOrder = (id) => {
        const action = true;
        this.props.setRequestGlobalAction(true);
        approveOrder(id, action)
            .then(piece => {
                this.loadData();
            })
            .finally(() => {
                this.props.setRequestGlobalAction(false)
            });
    };

    disapprovingOrder = (id) => {
        const action = false;
        this.props.setRequestGlobalAction(true);
        approveOrder(id, action)
            .then(piece => {
                this.loadData();
            })
            .finally(() => {
                this.props.setRequestGlobalAction(false)
            });
    };

    onEnterClick = (product) => {
        const url = joinUrlWithParamsId(PRODUCT.ORDERS_SHOW, product.id);
        this.props.history.push(url);
    };

    render() {
        const { loading, products, pieces } = this.state;

        return (
            <>
                <CustomList
                    list={products}
                    loading={loading}
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
                                                        {item.orderStatus !== 'PAID' && (
                                                            <td className="table-action">
                                                                <a
                                                                    href="#"
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        this.loadPieces(item.id)
                                                                    }}
                                                                    className="text-decoration-underline text-blue">
                                                                    Voir les détails
                                                                </a>
                                                                {!item.approved && (
                                                                    <>
                                                                        <Button
                                                                            size="small"
                                                                            color="primary"
                                                                            variant="contained"
                                                                            className={"text-white font-weight-bold mx-2"}
                                                                            onClick={() => this.approvingOrder(item.id)}
                                                                        >
                                                                            Approuver
                                                                        </Button>
                                                                        <Button
                                                                            size="small"
                                                                            color="primary"
                                                                            variant="contained"
                                                                            className={"text-white font-weight-bold bg-danger"}
                                                                            onClick={() => this.disapprovingOrder(item.id)}
                                                                        >
                                                                            Désapprouver
                                                                        </Button>
                                                                    </>
                                                                )}
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                        </>
                    )}
                />
                <Dialog
                    open={this.state.showBox}
                    onClose={() => { this.setState({ showBox: false }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'md'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Liste des pièces renseignées
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ showBox: false }) }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-12 my-3">
                                    <div className="table-responsive">
                                        {pieces.length === 0 ? (
                                            <EmptyResult message="Aucun pieces n'a encore été téléversés" />
                                        ) : (
                                            <table className="table table-hover table-middle mb-0 text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Nom de la pièce</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {pieces.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="table-action">
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                variant="contained"
                                                                className={"text-white font-weight-bold mr-3 bg-blue"}
                                                                href={getFilePath(item.file)}
                                                                target="_blank"
                                                                download
                                                            >
                                                                Consulter la pièce
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </DialogContent>
                </Dialog>
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
