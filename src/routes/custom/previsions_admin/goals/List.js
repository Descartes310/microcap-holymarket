import Create from "./Create";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import { setRequestGlobalAction, getPrevisionGoals } from "Actions";
import { joinUrlWithParamsId, PREVISIONS_ADMIN } from "Url/frontendUrl";

class List extends Component {

    state = {
        goals: [],
        show: false
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
                    titleList={"Liste des objectifs"}
                    itemsFoundText={n => n+" objectif(s) trouvé(s)"}
                    onAddClick={() => this.setState({ show: true })}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun objectif trouvé
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
                <Create 
                    show={show} 
                    close={() => {
                        this.setState({ show: false });
                        this.getGoals();
                    }}
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
