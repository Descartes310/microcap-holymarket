import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { BROKER } from "Url/frontendUrl";
import React, { Component } from 'react';
import IntlMessages from 'Util/IntlMessages';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { getBrokerAgencies, setRequestGlobalAction } from "Actions";

class List extends Component {
    static contextType = AbilityContext;

    state = {
        show: false,
        agencies: [],
    };

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        this.props.setRequestGlobalAction(true)
        getBrokerAgencies().then(agencies =>
            this.setState({ agencies })
        ).catch(err => this.setState({ agencies: [] }))
            .finally(() => {
                this.props.setRequestGlobalAction(false)
            })
    }

    render() {
        const { agencies } = this.state;
        return (
            <>
                <PageTitleBar title={"Mes agences"} match={this.props.match} enableBreadCrumb={false} />
                <CustomList
                    list={agencies}
                    loading={false}
                    onAddClick={() => this.props.history.push(BROKER.AGENCIES.CREATE)}
                    itemsFoundText={n => `${n} agences trouvées`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune agence trouvée
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Nom de l'agence</th>
                                                <th>Solde</th>
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
                                                                <h4 className="m-0 fw-bold text-dark">{item.agency.label}</h4>
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
