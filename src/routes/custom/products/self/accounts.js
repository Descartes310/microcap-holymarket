import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Permission from "Enums/Permissions";
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { getProductItemAvailable, setRequestGlobalAction } from "Actions";
import { getUserAccounts } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import FetchFailedComponent from "Components/FetchFailedComponent";
import Button from "@material-ui/core/Button";

class Account extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            products: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getUserAccounts(this.props.authUser.user.id)
            .then(products => {
                this.setState({ products });
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ loading: false }));
    };
    render() {
        const { loading, products } = this.state;

        return (
            <>
                <CustomList
                    loading={false}
                    list={products}
                    titleList={'Liste des comptes'}
                    itemsFoundText={n => `${n} compte(s) trouvé(s)`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun comptes trouvés
                                    </h4>
                                </div>
                            ) : (
                                    list && list.map((item, key) => {

                                        return (
                                            <>
                                                <h2 style={{ marginBottom: 20 }}>{item.type}</h2>
                                                {
                                                    item.accounts.length == 0 ?
                                                        <div className="d-flex justify-content-center align-items-center py-20">
                                                            <h4>
                                                                Aucun comptes trouvés
                                                    </h4>
                                                        </div>
                                                        :

                                                        <div className="table-responsive">
                                                            <table className="table table-hover table-middle mb-0 text-center">
                                                                <thead>
                                                                    <tr>
                                                                        <th><IntlMessages id="components.name" /></th>
                                                                        <th>Solde</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item.accounts.map((account, key) => (
                                                                        <tr key={key} className="cursor-pointer">
                                                                            <td>
                                                                                <div className="media">
                                                                                    <div className="media-body pt-10">
                                                                                        <h4 className="m-0 fw-bold text-dark">{account.name}</h4>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="media">
                                                                                    <div className="media-body pt-10">
                                                                                        <h4 className="m-0 fw-bold text-dark"> 0 {account.typeProduct.currency}</h4>
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
                                            </>
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
