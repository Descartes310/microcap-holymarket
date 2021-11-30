import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import { setRequestGlobalAction } from "Actions";
import { PRODUCT, joinUrlWithParamsId } from 'Url/frontendUrl'
import { getUncompleteAccounts } from "Actions/independentActions";

class Order extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            accounts: []
        }
    }

    onEnterClick = (id) => {
        const url = joinUrlWithParamsId(PRODUCT.UPDATE_UNCOMPLETE_ACCOUNTS, id);
        this.props.history.push(url);
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({ loading: true });
        getUncompleteAccounts()
            .then(accounts => {
                this.setState({ accounts });
            })
            .catch(() => null)
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    render() {
        const { loading, accounts } = this.state;

        return (
            <>
                <CustomList
                    loading={loading}
                    list={accounts}
                    titleList={"Comptes en attentes"}
                    itemsFoundText={n => `${n} comptes trouvées`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun compte trouvées
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>Utilisateur</th>
                                                <th>Nom du compte</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.user}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
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
                                                                onClick={() => this.onEnterClick(item.id)}
                                                            >
                                                                Activer le compte
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
