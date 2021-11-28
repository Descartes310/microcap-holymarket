import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import { BROKER, joinUrlWithParamsId } from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { getAgencyCounters, setRequestGlobalAction } from "Actions";

class List extends Component {
    static contextType = AbilityContext;

    state = {
        agency: { label: '...' },
        counters: [],
    };

    componentDidMount() {
        this.agencyId = this.props.match.params.id;
        this.loadData()
    }

    loadData() {
        this.props.setRequestGlobalAction(true)
        getAgencyCounters(this.agencyId).then(response =>
            this.setState({ counters: response.counters, agency: response.agency })
        ).catch(err => this.setState({ agencies: [] }))
            .finally(() => {
                this.props.setRequestGlobalAction(false)
            })
    }

    onItemClick = (id) => {
        this.props.history.push(joinUrlWithParamsId(BROKER.CASHDESKS.LIST, id));
    };

    render() {
        const { agency, counters } = this.state;
        return (
            <>
                <PageTitleBar title={"Guichets de " + agency.label} match={this.props.match} enableBreadCrumb={false} />
                <CustomList
                    list={counters}
                    loading={false}
                    onAddClick={() => this.props.history.push(joinUrlWithParamsId(BROKER.COUNTERS.CREATE, this.agencyId))}
                    itemsFoundText={n => `${n} guichets trouvés`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun guichet trouvée
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Nom du guichet</th>
                                                <th>Solde</th>
                                                <th>Actions</th>
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
                                                                <h4 className="m-0 fw-bold text-dark">{item.counter.label}</h4>
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
                                                                    onClick={() => this.onItemClick(item.counter.id)}
                                                                >
                                                                    Voir les caisses
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
