import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Permission from "Enums/Permissions";
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { PRODUCT, joinUrlWithParamsId } from "Url/frontendUrl";
import { setRequestGlobalAction } from "Actions";
import { getUserAccounts } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import FetchFailedComponent from "Components/FetchFailedComponent";
import Button from "@material-ui/core/Button";
import AmountCurrency from "Components/AmountCurrency";

class Account extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            products: {},
            total: 0
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getUserAccounts()
            .then(products => {
                this.setState({ products: this.groups(products), total: products.length });
            })
            .catch(() => null)
            .finally(() => this.setState({ loading: false }));
    };

    groups = (array) => {
        console.log("0N => ", array);
        let result = array.reduce((groups, account) => {
            const type = account.typeProduct;
            console.log('type => ', type);
            if (!groups[type]) {
                groups[type] = [];
            }
            groups[type].push(...account.accounts.reverse());
            return groups;
        }, {});
        console.log("1N => ", array);
        console.log("1O => ",result);
        return result;
    }

    groupArrays = () => {
        Object.keys(groups).map((type) => {
            return {
                date,
                transactions: groups[type]
            };
        });
    }

    render() {
        const { total, products } = this.state;
        const { history, authUser } = this.props;

        console.log(products);

        return (
            <>
                <CustomList
                    loading={false}
                    list={products}
                    titleList={'Liste des comptes'}
                    itemsFoundText={n => `${total} compte(s) trouvé(s)`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun comptes trouvés
                                    </h4>
                                </div>
                            ) : (
                                    Object.entries(list).map(function (account, index) {
                                        return (
                                            <div key={index}>
                                                <h2 style={{ marginBottom: 20 }}>{account[0]}</h2>
                                                 {
                                                    account[1].length == 0 ?
                                                        <div className="d-flex justify-content-center align-items-center py-20">
                                                            <h4>
                                                                Aucun comptes trouvés
                                                    </h4>
                                                        </div>
                                                        :

                                                        <div className="table-responsive mb-40">
                                                            <table className="table table-hover table-middle mb-0 text-center">
                                                                <thead>
                                                                    <tr>
                                                                        <th><IntlMessages id="components.name" /></th>
                                                                        <th>Solde</th>
                                                                        <th>Unité</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Array.isArray(account[1]) && account[1].map((account, key) => (
                                                                        <tr key={key} className="cursor-pointer">
                                                                            <td>
                                                                                <div className="media">
                                                                                    <div className="media-body pt-10">
                                                                                        <h4 className="m-0 fw-bold text-dark">{account.label}</h4>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="media">
                                                                                    <div className="media-body pt-10">
                                                                                        <h4 className="m-0 fw-bold text-dark"> <AmountCurrency amount={ account.detailsProducts.filter(d => d.detailsType.name == 'SOLDE').length > 0 ? account.detailsProducts.filter(d => d.detailsType.name == 'SOLDE')[0].value : 0 } from={account.detailsProducts.filter(d => d.detailsType.name == 'CURRENCY').length > 0 ? account.detailsProducts.filter(d => d.detailsType.name == 'CURRENCY')[0].value : 'EUR'} unit={account.typeProduct.unit} to={authUser.user.currency.code} /></h4>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="media">
                                                                                    <div className="media-body pt-10">
                                                                                        <h4 className="m-0 fw-bold text-dark"> { account.typeProduct.unit ? account.typeProduct.unit.name : authUser.user.currency.name}</h4>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="table-action">
                                                                                <Button
                                                                                    size="small"
                                                                                    color="primary"
                                                                                    // disabled={loading}
                                                                                    variant="contained"
                                                                                    className={"text-white font-weight-bold mr-3"}
                                                                                    onClick={() => history.push(joinUrlWithParamsId(PRODUCT.ACCOUNT_DETAILS, account.id))}
                                                                                >
                                                                                    Consulter le compte
                                                                                </Button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                }
                                            </div>
                                        )
                                    }
                                    )
                                )
                            }
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
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(Account))));
