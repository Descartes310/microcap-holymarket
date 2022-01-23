import React, { Component } from 'react';
import { connect } from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import { getPackages, setPackageActivationStatus, setRequestGlobalAction } from "Actions";
import { Badge, Button, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { injectIntl } from "react-intl";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import Permission from "Enums/Permissions.tsx";
import CustomList from "Components/CustomList";
import { PACKAGES } from "Url/frontendUrl";
import Switch from "@material-ui/core/Switch/Switch";
import { NotificationManager } from "react-notifications";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import AmountCurrency from "Components/AmountCurrency";
import { PRODUCT, joinUrlWithParams } from "Url/frontendUrl";


class PackageList extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.state = {
            catalogId: null,
            loading: false,
        }
    }

    componentDidMount() {
        // this.props.getPackages(this.props.authUser.user.branch.id);
        this.props.getPackages(this.props.authUser.user.id, this.props.authUser.user.branch.id);
    }

    onToggleActivationStatus = (packageId, value) => {
        this.setState({ loading: true });
        setPackageActivationStatus(packageId, value)
            .then(() => {
                this.props.getPackages(this.props.authUser.user.id, this.props.authUser.user.branch.id);
                NotificationManager.success("Changement du status du paquetage effectué avec succès");
            })
            .catch(() => {
                NotificationManager.error("Erreur lors du changement du status du paquetage");
            })
            .finally(() => this.setState({ loading: false }));
    };    
    
    onEnterClick = (product, type) => {
        let url = joinUrlWithParams(PRODUCT.DETAILS, [{ param: 'id', value: product.id }, { param: 'type', value: type }]);
        this.props.history.push(url);
    };

    render() {
        const { packages, loading, error, history } = this.props;

        if (this.state.loading) {
            return (<RctSectionLoader />);
        }

        return (
            <>
                <CustomList
                    error={error}
                    loading={loading}
                    list={packages}
                    onAddClick={() => history.push(PACKAGES.CREATE)}
                    itemsFoundText={n => `${n} paquet(s) trouvé(s)`}
                    addPermissions={{
                        permissions: [],
                    }}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun paquets trouvés
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
                                                    <th><IntlMessages id="widgets.description" /></th>
                                                    <th>Nombres de produits</th>
                                                    <th>Prix</th>
                                                    <th>Actions</th>
                                                    {/* <th>Statut d'activation</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((catalog, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-left media-middle mr-15">
                                                                    {/*<img src={catalog.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                </div>
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{catalog.label}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{catalog.description}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="table-action">
                                                            <h4 className="m-0 fw-bold text-dark">{catalog.packageItem.length}</h4>
                                                        </td>
                                                        <td className="table-action">
                                                            <AmountCurrency amounts={catalog.packageItem.map((e) => {
                                                                return { amount: e.price, currency: e.currency, quantity: e.quantity }
                                                            })} styles={{ fontWeight: 'bold', marginBottom: 40 }} />
                                                        </td>
                                                        <td className="table-action">
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                // disabled={loading}
                                                                variant="contained"
                                                                className={"text-white font-weight-bold mr-3 bg-blue"}
                                                                onClick={() => this.onEnterClick(catalog, 'PACKAGE')}
                                                            >
                                                                Voir les détails
                                                            <i className="zmdi zmdi-arrow-right mr-2" />
                                                            </Button>
                                                        </td>
                                                        {/* <td className="table-action">
                                                    <Switch
                                                        checked={catalog.active}
                                                        onChange={(event) => this.onToggleActivationStatus(catalog.id, event.target.value)}
                                                        aria-label="Activé"
                                                    />
                                                </td> */}
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

// map state to props
const mapStateToProps = ({ requestGlobalLoader, packages, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data, loading: packages.loading, packages: packages.data, error: packages.error }
};

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

export default connect(mapStateToProps, { getPackages, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(PackageList))));
