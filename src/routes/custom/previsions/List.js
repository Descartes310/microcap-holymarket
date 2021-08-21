import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { PREVISIONS } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction, getPrevisionGoals } from "Actions";

class List extends Component {

    state = {
        goals: []
    };

    componentDidMount() {
        this.getGoals();
    }

    getGoals = () => {
        this.props.setRequestGlobalAction(true);
        getPrevisionGoals().then(goals => {
            this.setState({ goals })
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    };

    render() {
        const { history } = this.props;
        const { goals, show } = this.state;

        return (
            <>
                <CustomList
                    list={goals}
                    loading={false}
                    titleList={"Mes prévisions"}
                    itemsFoundText={n => n+" prévision(s) trouvée(s)"}
                    onAddClick={() => history.push(PREVISIONS.CREATE)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun prévision trouvée
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Titre</th>
                                                    <th>Description</th>
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
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.label}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.description}</h4>
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
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(List)));
