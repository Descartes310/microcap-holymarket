import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import { getProductItemAvailable, setRequestGlobalAction } from "Actions";
import { getAccountDetails, approvisioningVoucher, getAccountTransactions } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
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

class AccountShow extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            account: [],
            balance: '0',
            currency: 'Currency',
            showQuantityBox: false,
            transactions: {}
        }
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
                });
                let balance = account.detailsProducts.filter(d => d.detailsType.name == 'SOLDE')
                if (balance.length > 0) {
                    this.setState({ balance: balance[0].value })
                }
                this.setState({ currency: account.typeProduct.currency });
            })
            .catch((err) => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ loading: false }));
    };

    handleApprovisioning = (value) => {
        approvisioningVoucher(this.state.account.id, { voucherCode: value })
            .then(account => {
                this.loadData()
            })
            .catch((err) => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ showQuantityBox: false }));
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


    render() {
        const { loading, account, balance, currency, showQuantityBox, transactions } = this.state;
        const { match, history, classes } = this.props;

        return (
            <>
                <RctCollapsibleCard>
                    <PageTitleBar title={"Details sur les comptes"} match={match} history={history} enableBreadCrumb={false} />
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
                                                    <Link to={''}>
                                                        Voir le relévé
                                                    </Link>
                                                </li>
                                                <li style={{ width: '98%' }}>
                                                    <Link to={''}>
                                                        Imprimer
                                                    </Link>
                                                </li>
                                                <li style={{ width: '98%' }}>
                                                    <Link to={''}>
                                                        Modifier le libellé du compte
                                                    </Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </Scrollbars>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                        <h1 className="mr-2"><span style={{ color: '#fed039' }}>Solde:</span> {balance} {currency}</h1>
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
                        <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            className={"text-white font-weight-bold mr-3"}
                            onClick={() => this.setState({ showQuantityBox: true })}
                        >
                            Approvisionnement
                        </Button>
                    </div>
                    <div className="table-responsive" style={{ padding: 40 }}>

                        {
                            Object.entries(transactions).map(function (transaction, index) {
                                return (
                                    <>
                                        <p>{<TimeFromMoment time={transaction[0]} showFullDate />}</p>
                                        <table className="table table-hover table-middle mb-60 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Motif de la transaction</th>
                                                    <th>Sens</th>
                                                    <th>Montant</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    transaction[1].map(transaction => (
                                                        <tr>
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
                                                                        <h4 className="m-0 text-dark">{transaction.amount} {currency}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body">
                                                                        <h4 className="m-0 text-dark"><TimeFromMoment time={transaction.createdAt} /></h4>
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
                                                                    Détails
                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </>
                                )
                            })}
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
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(AccountShow))));
