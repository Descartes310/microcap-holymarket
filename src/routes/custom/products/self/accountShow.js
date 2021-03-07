import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import { setRequestGlobalAction } from "Actions";
import { getAccountDetails, approvisioningVoucher, approvisioningCard, getAccountTransactions, getConsolidationBalance } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import { Scrollbars } from 'react-custom-scrollbars';
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SweetAlert from "react-bootstrap-sweetalert";
import TimeFromMoment from "Components/TimeFromMoment";
import AmountCurrency from "Components/AmountCurrency";
import StripeCheckout from 'react-stripe-checkout';
import DocService from 'Helpers/DocService';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from '@material-ui/icons/Cancel';
import { computeAmountFromCurrency } from 'Helpers/helpers'

class AccountShow extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            account: { typeProduct: { isAggregation: false }},
            balance: '0',
            amount: 0,
            consolidation: { amount: 0, currency: 'EUR'},
            account_currency: null,
            showQuantityBox: false,
            paying: false,
            transactions: {},
            printing: false,
            showCurrencyBox: false,
            currency: this.props.authUser.user.currency.code
        }
        this.billRef = React.createRef();
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getAccountDetails(this.props.match.params.id)
            .then(account => {
                this.setState({ account }, () => {
                    getAccountTransactions(account.id)
                        .then(transactions => {
                            this.setState({ transactions: this.groups(transactions) });
                        })
                    this.getBalance();
                });
                let balance = account.detailsProducts.filter(d => d.detailsType.name == 'SOLDE')
                let account_currency = account.detailsProducts.filter(d => d.detailsType.name == 'CURRENCY')
                if (balance.length > 0) {
                    this.setState({ balance: balance[0].value })
                }
                if (account_currency.length > 0)
                    this.setState({ account_currency: account_currency[0].value });
                else
                    this.setState({ account_currency: 'EUR' });
            })
            .catch((err) => {
                console.log(err)
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ loading: false }));
    };

    changeAccountCurrency = (id) => {
        let currency = this.props.currencies.filter(c => c.id == id)[0];
        if (currency == null)
            return;

        this.setState({ currency: currency.code, showCurrencyBox: false });
        // changeCurrency(this.props.match.params.id, id)
        //     .then(response => {
        //         // this.loadData();
        //         window.location.reload()
        //         this.setState({ showCurrencyBox: false })
        //     })
        //     .catch((err) => {
        //         NotificationManager.error(ERROR_500);
        //     })
        //     .finally(() => this.setState({ loading: false }));
    };

    handleApprovisioning = (value) => {
        approvisioningVoucher(this.state.account.id, { voucherCode: value })
            .then(account => {
                this.loadData()
            })
            .catch((err) => {
                console.log(err)
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ showQuantityBox: false }));
    };

    getBalance = () => {
        getConsolidationBalance(this.state.account.id)
            .then(data => {
                this.setState({ consolidation: data })
            });
    };

    handleApprovisioningCard = (token) => {
        approvisioningCard(this.state.account.id, { amount: this.state.amount, token: token.id })
            .then(account => {
                this.loadData()
            })
            .catch((err) => {
                console.log(err)
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ paying: false }));
    };

    groups = (array) => {
        let result = array.reduce((groups, transaction) => {
            const date = transaction.createdAt.split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(transaction);
            return groups;
        }, {});
        return result;
    }

    groupArrays = () => {
        Object.keys(groups).map((date) => {
            return {
                date,
                transactions: groups[date]
            };
        });
    }

    generateBills = (name) => {
        this.setState({ printing: true }, () => {
            DocService.createPdf(this.billRef.current, name, (new Date()).toISOString(), () => {
            });
        })
    }

    render() {
        const { account_currency, account, balance, consolidation, currency, showQuantityBox, transactions, paying, printing, showCurrencyBox } = this.state;
        const { match, history, classes } = this.props;
        console.log('TEST => ', this.props.currencies, this.state.amount, null, this.props.authUser.user.currency, account_currency, currency, this.props.currencies.filter(c => c.code == currency)[0].decimal)

        return (
            <>
                <RctCollapsibleCard>
                    <div>
                        <PageTitleBar title={"Details sur les comptes"} match={match} history={history} enableBreadCrumb={true} />
                        <div className="page-title d-flex justify-content-between align-items-center" style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 20 }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h1 className="mr-10 mb-0" >{account.label}</h1>
                                <UncontrolledDropdown nav className="list-inline-item quciklink-dropdown tour-step-1">
                                    <DropdownToggle nav className="header-icon p-0">
                                        <Tooltip title="Actions" placement="bottom">
                                            <i className="zmdi zmdi-apps" style={{ color: '#fed039' }}></i>
                                        </Tooltip>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={350}>
                                            <div className="dropdown-content">
                                                <div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
                                                    <span className="text-white font-weight-bold">Liste des actions</span>
                                                </div>
                                                <ul className="list-unstyled mb-0 dropdown-list d-flex" style={{ flexDirection: 'column' }}>
                                                    <li style={{ width: '98%' }}>
                                                        <p style={{
                                                            fontSize: '1.3em',
                                                            textAlign: 'center',
                                                            paddingTop: 5,
                                                            cursor: 'pointer'
                                                        }}>
                                                            Voir le relévé
                                                    </p>
                                                    </li>
                                                    <li style={{ width: '98%' }} onClick={() => this.generateBills(account.label)}>
                                                        <p style={{
                                                            fontSize: '1.3em',
                                                            textAlign: 'center',
                                                            paddingTop: 5,
                                                            cursor: 'pointer'
                                                        }}>
                                                            Imprimer
                                                    </p>
                                                    </li>
                                                    <li style={{ width: '98%' }}>
                                                        <p style={{
                                                            fontSize: '1.3em',
                                                            textAlign: 'center',
                                                            paddingTop: 5,
                                                            cursor: 'pointer'
                                                        }}>
                                                            Modifier le libellé
                                                    </p>
                                                    </li>
                                                    {account.typeProduct ? account.typeProduct.unit == null && account.typeProduct.currency != null ?
                                                        <li style={{ width: '98%' }} onClick={() => this.setState({ showCurrencyBox: true })}>
                                                            <p style={{
                                                                fontSize: '1.3em',
                                                                textAlign: 'center',
                                                                paddingTop: 5,
                                                                cursor: 'pointer'
                                                            }}>
                                                                Modifier la devise
                                                        </p>
                                                        </li>
                                                        : null
                                                        : null
                                                    }

                                                </ul>
                                            </div>
                                        </Scrollbars>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                            <h1 className="mr-2"><span style={{ color: '#fed039' }}>Solde:</span>
                            {account.typeProduct.isAggregation ? 
                            <AmountCurrency styles={{ fontSize: '1.1em' }} amount={consolidation.amount} from={consolidation.currency} to={currency} unit={consolidation.unit} /> : 
                                account_currency ? <AmountCurrency styles={{ fontSize: '1.1em' }} amount={balance} from={account_currency} to={currency} unit={account.typeProduct ? account.typeProduct.unit : null} /> : '0 EUR'}</h1>

                        </div>
                        <div className="page-title d-flex justify-content-between align-items-center" style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 20 }}>
                            <h1 className="mr-2"><span style={{ color: '#fed039' }}>Planché:</span>
                                {account_currency ? <AmountCurrency styles={{ fontSize: '1.1em' }} amount={account.typeProduct.minBalance} from={account_currency} to={currency} unit={account.typeProduct ? account.typeProduct.unit : null} /> : '0 EUR'}</h1>
                            <h1 className="mr-2"><span style={{ color: '#fed039' }}>Plafond:</span>
                                {account_currency ? <AmountCurrency styles={{ fontSize: '1.1em' }} amount={account.typeProduct.maxBalance} from={account_currency} to={currency} unit={account.typeProduct ? account.typeProduct.unit : null} /> : '0 EUR'}</h1>
                        </div>

                        <div className="d-flex justify-content-between align-items-center" style={{ padding: 40 }}>
                            <FormControl>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <IconButton aria-label="facebook">
                                            <i className="zmdi zmdi-search" />
                                        </IconButton>
                                    </InputGroupAddon>
                                    <Input
                                        type="text"
                                        name="search"
                                        value={this.state.searched}
                                        placeholder={'Recherchez...'}
                                        onChange={event => this.onSearchChanged(event, canSearch)}
                                    />
                                </InputGroup>
                            </FormControl>
                            {
                                !account.typeProduct.isAggregation ?
                                <>
                                    {
                                    !paying ?
                                    <div>
                                        <Button
                                            size="large"
                                            color="primary"
                                            variant="contained"
                                            className={"text-white font-weight-bold mr-3"}
                                            onClick={() => this.setState({ showQuantityBox: true })}
                                        >
                                            Approvisionnement coupon
                                        </Button>
                                        {
                                            account.typeProduct ? account.typeProduct.unit == null && account.typeProduct.currency != null ?

                                                <Button
                                                    size="large"
                                                    color="primary"
                                                    variant="contained"
                                                    className={"text-white font-weight-bold mr-3"}
                                                    onClick={() => this.setState({ paying: true })}
                                                >
                                                    Approvisionnement carte
                                                </Button>
                                                :
                                                null
                                                : null
                                        }
                                    </div>
                                    :
                                    <div className='d-flex'>
                                        <Input
                                            type="number"
                                            name="amount"
                                            id="amount"
                                            placeHolder='Montant a recharger'
                                            onChange={(e) => this.setState({ amount: e.target.value })}
                                        />
                                        <StripeCheckout
                                            stripeKey="pk_test_51ILMcRF8O7K51xUUQ3rGe0lMNsDJWjM4DCxMH7zJwnxl2uFiVeC8hzrOYmAGHKiU4XAM5OIgHTZhjDrac7vP97yo00VO7op4Qx"
                                            token={this.handleApprovisioningCard}
                                            amount={(Number(computeAmountFromCurrency(this.props.currencies, this.state.amount, null, this.props.authUser.user.currency, account_currency, currency))) * this.props.currencies.filter(c => c.code == currency)[0].decimal}
                                            name="Recharger le compte"
                                            currency={currency}
                                            label="Recharger"
                                        />
                                        <Button
                                            size="large"
                                            color="primary"
                                            variant="contained"
                                            className={"text-white font-weight-bold mr-3"}
                                            onClick={() => this.setState({ paying: false })}
                                        >
                                            Annuler
                                        </Button>
                                    </div>}
                                </> : null }
                        </div>
                        <div className="table-responsive" style={{ padding: 40 }} ref={this.billRef}>
                            <h1 style={{ marginBottom: 50 }}>Mouvements sur le compte {account.label}</h1>
                            {
                                Object.entries(transactions).map(function (transaction, index) {
                                    return (
                                        <div key={index}>
                                            <p>{<TimeFromMoment time={transaction[0]} showFullDate />}</p>
                                            <table className="table table-hover table-middle mb-60 text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Libellé</th>
                                                        <th>Nature</th>
                                                        <th>Valeur</th>
                                                        {
                                                            !printing ?
                                                                <th>Action</th> :
                                                                null
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        transaction[1].map((transaction, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark"><TimeFromMoment showFullDate time={transaction.createdAt} /></h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark">{transaction.motif.length > 100 ? transaction.motif.substring(0, 100) + '...' : transaction.motif}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark">{transaction.direction}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark"><AmountCurrency amount={transaction.amount} from={transaction.currency} to={currency} unit={account.typeProduct ? account.typeProduct.unit : null} /></h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                {
                                                                    !printing ?
                                                                        <td className="table-action">
                                                                            <Button
                                                                                size="small"
                                                                                color="primary"
                                                                                variant="contained"
                                                                                className={"text-white font-weight-bold mr-3 bg-blue"}
                                                                            >
                                                                                Détails
                                                                    </Button>
                                                                        </td>
                                                                        :
                                                                        null
                                                                }
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </RctCollapsibleCard>
                <SweetAlert
                    input
                    btnSize="sm"
                    show={showQuantityBox}
                    showCancel
                    cancelBtnBsStyle="danger"
                    title="Code de recharge"
                    placeHolder="10"
                    inputType="text"
                    onConfirm={(value) => this.handleApprovisioning(value)}
                    onCancel={() => this.setState({ showQuantityBox: false })}
                    confirmBtnText="Recharger"
                    cancelBtnText="Annuler"
                    confirmBtnCssClass="bg-primary text-white"
                >
                    Entrez le code du coupon de recharge
                </SweetAlert>
                <Dialog
                    open={showCurrencyBox}
                    onClose={() => { this.setState({ showCurrencyBox: false }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'md'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Modifier la devise du compte
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ showCurrencyBox: false }) }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <table className="table table-hover table-middle mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Code</th>
                                    <th>status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.currencies.map((c, index) => (
                                        <tr key={index}>
                                            <td>{c.name}</td>
                                            <td>{c.code}</td>
                                            <td style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <div className="user-status-pending" style={{ position: 'relative' }}>
                                                    <div className={`user-status-pending-circle rct-notify`} style={{
                                                        background: c.code == currency ? 'green' : 'red'
                                                    }} />
                                                </div>
                                            </td>
                                            <td>
                                                {
                                                    c.code != currency ?
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                            variant="contained"
                                                            className={"text-white font-weight-bold mr-3 bg-blue"}
                                                            onClick={() => this.changeAccountCurrency(c.id)}
                                                        >
                                                            Sélectionner
                                                        </Button>
                                                        : null
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
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
const mapStateToProps = ({ requestGlobalLoader, authUser, settings }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        currencies: settings.currencies
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(AccountShow))));
