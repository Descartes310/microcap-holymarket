import React, { Component } from 'react';
import { connect } from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import { getComOffer, setRequestGlobalAction } from "Actions";
import { injectIntl } from "react-intl";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { COMMERCIAL_MANAGEMENT, joinUrlWithParamsId } from "Url/frontendUrl";
import Switch from "@material-ui/core/Switch";
import { NotificationManager } from "react-notifications";
import Button from "@material-ui/core/Button";
import { setOfferActivationStatus } from "Actions/independentActions";

const saleWays = [{
    label: 'Ventes classiques',
    key: 'CLASSIC_SALE',
}, {
    label: 'Solutions financières',
    key: 'FINANCIAL_SOLUTION',
}, {
    label: 'Ventes privées',
    key: 'PRIVATE_SALE',
}]

class List extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.state = {
            catalogId: null,
            showCreateBox: false,
        }
    }

    getSaleWay(key) {
        if (key) {
            return saleWays.filter(sw => sw.key == key)[0].label;
        }
        return '-'
    }

    componentDidMount() {
        this.props.getComOffer(this.props.authUser.user.id);
    }

    onToggleActivationStatus = (packageId, value) => {
        this.setState({ loading: true });
        setOfferActivationStatus(this.props.authUser.user.id, packageId, value)
            .then(() => {
                this.props.getComOffer(this.props.authUser.user.id);
                NotificationManager.success("Changement du status de l'offre effectué avec succès");
            })
            .catch(() => {
                NotificationManager.error("Erreur lors du changement de l'offre");
            })
            .finally(() => this.setState({ loading: false }));
    };

    render() {
        const { comOffer, loading, error, history } = this.props;
        const { showCreateBox } = this.state;

        return (
            <>
                <CustomList
                    error={error}
                    loading={loading}
                    list={comOffer}
                    titleList={"Offres commerciale"}
                    onAddClick={() => history.push(COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.CREATE)}
                    itemsFoundText={n => `${n} offre(s) commerciale(s) trouvée(s)`}
                    addPermissions={{
                        permissions: [],
                    }}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun offres commerciales trouvées
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
                                                    <th>Canal de vente</th>
                                                    <th><IntlMessages id="widgets.description" /></th>
                                                    <th>Status d'activation</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{this.getSaleWay(item.saleWay)}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.description}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="table-action">
                                                            <Switch
                                                                checked={item.isActive}
                                                                onChange={(event) => { this.onToggleActivationStatus(item.id, event.target.checked) }}
                                                                aria-label="Activé"
                                                            />
                                                        </td>
                                                        <td className="table-action">
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                // disabled={loading}
                                                                variant="contained"
                                                                className={"text-white font-weight-bold mr-3"}
                                                                onClick={() => history.push(joinUrlWithParamsId(COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.ADD_PRODUCT, item.id))}
                                                            >
                                                                Nouveau produit
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

// map state to props
const mapStateToProps = ({ requestGlobalLoader, comOffer, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data, loading: comOffer.loading, comOffer: comOffer.data, error: comOffer.error }
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

export default connect(mapStateToProps, { getComOffer, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(List))));
