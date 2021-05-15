import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import { setRequestGlobalAction } from "Actions";
import { getAccountDetails, approvisioningVoucher, approvisioningCard, getAccountTransactions, getConsolidationBalance, printingAccountLogs } from "Actions/independentActions";
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
import {computeAmountFromCurrency, downloadContent} from 'Helpers/helpers'
import {joinBaseUrlWithParams} from "Url/backendUrl";

class AccountLogs extends Component {
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
        if(this.state.account.typeProduct.isAggregation)
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
        console.log('generate bills')
    }



    onPrintAccountLogs = async (accounId) => {
        this.props.setRequestGlobalAction(true);
        const fileToDownload = await printingAccountLogs(accounId);
        this.props.setRequestGlobalAction(false);
        downloadContent(joinBaseUrlWithParams(fileToDownload.substring(1,fileToDownload.length), []));
    }


    render() {
        const { account_currency, account, balance, consolidation, currency, showQuantityBox, transactions, paying, printing, showCurrencyBox } = this.state;
        const { match, history, classes } = this.props;
        console.log('TEST => ', this.props.currencies, this.state.amount, null, this.props.authUser.user.currency, account_currency, currency, this.props.currencies.filter(c => c.code == currency)[0].decimal)

        return (
            <>
                <RctCollapsibleCard>
                    <div>
                        <PageTitleBar title={"Mouvements sur le compte "+ account.label } match={match} history={history} enableBreadCrumb={true} />
                        <div className="page-title d-flex justify-content-between align-items-center" style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 20 }}>
                            <div className="d-flex justify-content-between align-items-center">

                            </div>
                            <h1 className="mr-2 font-2x"><span style={{ color: "blue" }}>Solde: </span>
                                {account.typeProduct.isAggregation ?
                                    <AmountCurrency styles={{ fontSize: '1.1em' }} amount={consolidation.amount} from={consolidation.currency} to={currency} unit={consolidation.unit} /> :
                                    account_currency ? <AmountCurrency styles={{ fontSize: '1.1em' }} amount={balance} from={account_currency} to={currency} unit={account.typeProduct ? account.typeProduct.unit : null} /> : '0 EUR'}</h1>

                        </div>

                        <div className="table-responsive" style={{ padding: 40 }} ref={this.billRef}>
                            {
                                Object.entries(transactions).map(function (transaction, index) {
                                    return (
                                        <div key={index}>
                                            <p>{<TimeFromMoment time={transaction[0]} showFullDate />}</p>
                                            <table className="table table-hover table-middle mb-60">
                                                <thead>
                                                <tr>
                                                    {/* <th>Date</th> */}
                                                    <th>Libellé</th>
                                                    <th>Crédit</th>
                                                    <th>Débit</th>
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
                                                                        <h4 className="m-0 text-dark">{transaction.motif.length > 100 ? transaction.motif.substring(0, 100) + '...' : transaction.motif}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body">
                                                                        <h4 className="m-0 text-success">{ transaction.direction == 'CREDIT' ? <AmountCurrency notShowCurrency amount={transaction.amount} from={transaction.currency} to={currency} unit={account.typeProduct ? account.typeProduct.unit : null} /> : '-' }</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body">
                                                                        <h4 className="m-0 text-danger">{ transaction.direction == 'DEBIT' ? <AmountCurrency notShowCurrency amount={transaction.amount} from={transaction.currency} to={currency} unit={account.typeProduct ? account.typeProduct.unit : null} /> : '-' }</h4>
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
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                className={"text-white font-weight-bold mr-3 bg-blue"}
                                onClick={() => this.onPrintAccountLogs(account.id)}
                            >
                                Imprimer
                            </Button>
                        </div>
                    </div>
                </RctCollapsibleCard>

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
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(AccountLogs))));
