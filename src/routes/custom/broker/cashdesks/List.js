import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import CreditCashdeskModal from "./CreditCashdeskModal";
import { BROKER, joinUrlWithParamsId } from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { getCounterCashdesks, setRequestGlobalAction } from "Actions";

class List extends Component {
    static contextType = AbilityContext;

    state = {
        show: false,
        cashdesks: [],
        cashdesk: null,
        counter: { label: '...' },
    };

    componentDidMount() {
        this.counterId = this.props.match.params.id;
        this.loadData()
    }

    loadData() {
        this.props.setRequestGlobalAction(true)
        getCounterCashdesks(this.counterId).then(response =>
            this.setState({ cashdesks: response.cashdesks, counter: response.counter })
        ).catch(err => this.setState({ cashdesks: [] }))
            .finally(() => {
                this.props.setRequestGlobalAction(false)
            })
    }

    onCreditCashdesk = (item) => {
        this.setState({ cashdesk: item, show: true })
    };

    viewCounterMouvements = (id) => {
        this.props.history.push(joinUrlWithParamsId(BROKER.CASHDESKS.MOUVEMENTS, id));
    };

    render() {
        const { counter, cashdesks, cashdesk, show } = this.state;
        return (
            <>
                <PageTitleBar title={"Caisses de " + counter.label} match={this.props.match} enableBreadCrumb={false} />
                <CustomList
                    list={cashdesks}
                    loading={false}
                    onAddClick={() => this.props.history.push(joinUrlWithParamsId(BROKER.CASHDESKS.CREATE, this.counterId))}
                    itemsFoundText={n => `${n} caisses trouvées`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune caisse trouvée
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Nom du guichet</th>
                                                <th>Solde</th>
                                                <th>Crédit</th>
                                                <th>Relevé</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr
                                                    key={key}
                                                    className="cursor-pointer"
                                                >
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.cashdesk.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">€ {item.balance}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <Button
                                                                    color="primary"
                                                                    variant="contained"
                                                                    style={{ marginRight: 10 }}
                                                                    className="text-white font-weight-bold"
                                                                    onClick={() => this.onCreditCashdesk(item.cashdesk)}
                                                                >
                                                                    Créditer la caisse
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <Button
                                                                    color="primary"
                                                                    variant="contained"
                                                                    style={{ marginRight: 10 }}
                                                                    className="text-white font-weight-bold"
                                                                    onClick={() => this.viewCounterMouvements(item.cashdesk.id)}
                                                                >
                                                                    Voir le relevé
                                                                </Button>
                                                            </div>
                                                        </div>
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
                {cashdesk && (
                    <CreditCashdeskModal
                        cashdesk={cashdesk}
                        show={show && cashdesk}
                        onClose={() => { this.setState({ show: false, cashdesk: null }); this.loadData() }}
                    />
                )}
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(List)));
