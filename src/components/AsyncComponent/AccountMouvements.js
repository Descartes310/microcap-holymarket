import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import { withStyles } from "@material-ui/core";
import { downloadContent } from 'Helpers/helpers'
import { AbilityContext } from "Permissions/Can";
import { setRequestGlobalAction } from "Actions";
import { joinBaseUrlWithParams } from "Url/backendUrl";
import TimeFromMoment from "Components/TimeFromMoment";
import AmountCurrency from "Components/AmountCurrency";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { getAccountTransactions, printingAccountLogs } from "Actions/independentActions";

class AccountMouvements extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.props.setRequestGlobalAction(true)
        getAccountTransactions(this.props.account.id).then(transactions =>
            this.setState({ transactions: this.groupTransactions(transactions) })
        ).catch(err => this.setState({ transactions: [] }))
            .finally(() => {
                this.props.setRequestGlobalAction(false)
            })
    }

    groupTransactions = (array) => {
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

    onPrintAccountTransactions = async () => {
        this.props.setRequestGlobalAction(true);
        const fileToDownload = await printingAccountLogs(this.props.account.id);
        this.props.setRequestGlobalAction(false);
        window.open(joinBaseUrlWithParams(fileToDownload.substring(1, fileToDownload.length), []), '_blank');
    }

    render() {

        const { account } = this.props;
        const { transactions } = this.state;

        return (
            <RctCollapsibleCard>
                <>
                    <div className="page-title d-flex justify-content-between align-items-center" style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 20 }}>
                        <div className="d-flex justify-content-between align-items-center">

                        </div>
                        <h1 className="mr-2 font-2x">
                            <span style={{ color: "#fed039" }}>Solde: </span>
                            <AmountCurrency styles={{ fontSize: '1em' }} amount={account.balance} from={account.currency} />
                        </h1>

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
                                                    <th>Libellé</th>
                                                    <th>Crédit</th>
                                                    <th>Débit</th>
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
                                                                        <h4 className="m-0 text-success">{transaction.direction == 'CREDIT' ? <AmountCurrency notShowCurrency amount={transaction.amount} from={transaction.currency} /> : '-'}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body">
                                                                        <h4 className="m-0 text-danger">{transaction.direction == 'DEBIT' ? <AmountCurrency notShowCurrency amount={transaction.amount} from={transaction.currency} /> : '-'}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
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
                            onClick={() => this.onPrintAccountTransactions()}
                        >
                            Imprimer
                        </Button>
                    </div>
                </>
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
const mapStateToProps = ({ requestGlobalLoader, authUser, settings }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        currencies: settings.currencies
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(AccountMouvements))));
