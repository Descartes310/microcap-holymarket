import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import ConfirmBox from "Components/dialog/ConfirmBox";
import { PREVISIONS, joinUrlWithParams } from "Url/frontendUrl";
import { setRequestGlobalAction, getUserPrevisions, activePrevision } from "Actions";

class List extends Component {

    state = {
        previsions: [],
        showBox: false,
        selectedPrevision: null
    };

    componentDidMount() {
        this.getPrevisions();
    }

    getPrevisions = () => {
        this.props.setRequestGlobalAction(true);
        getUserPrevisions().then(previsions => {
            this.setState({ previsions })
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    };

    updatePrevision = (id) => {
        this.props.setRequestGlobalAction(true);
        activePrevision(id).then(__ => {
            this.getPrevisions();
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
            this.setState({ showBox: false, selectedPrevision: null })
        })
    };

    onEnterClick = (id) => {
        let url = joinUrlWithParams(PREVISIONS.PERIODES.LIST, [{ param: 'id', value: id }]);
        this.props.history.push(url);
    };

    render() {
        const { history } = this.props;
        const { previsions, show } = this.state;

        return (
            <>
                <CustomList
                    list={previsions}
                    loading={false}
                    titleList={"Mes prévisions"}
                    itemsFoundText={n => n + " prévision(s) trouvée(s)"}
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
                                                    <th>Label</th>
                                                    <th>Date de début</th>
                                                    <th>Date de fin</th>
                                                    <th>Numéro</th>
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
                                                                <div className="media-body pt-10 d-flex align-content-center align-items-center">
                                                                    <div className={`user-status-pending-circle rct-notify`} style={{ background: item.status ? 'green' : 'red' }} />
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark ml-15">{item.label}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.startDate}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.endDate}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.reference}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="table-action">
                                                            <Button
                                                                size="small"
                                                                variant="contained"
                                                                className={"text-white bg-blue"}
                                                                onClick={() => this.onEnterClick(item.id)}
                                                            >
                                                                Périodes
                                                            </Button>
                                                            {item.status ?
                                                                <Button
                                                                    size="small"
                                                                    variant="contained"
                                                                    className={"text-white ml-5"}
                                                                    style={{ backgroundColor: '#ed431d', borderColor: '#ed431d' }}
                                                                    onClick={() => this.setState({ selectedPrevision: item, showBox: true })}
                                                                >
                                                                    Désactiver
                                                            </Button> :
                                                                <Button
                                                                    size="small"
                                                                    variant="contained"
                                                                    className={"text-white ml-5"}
                                                                    style={{ backgroundColor: '#FFB70F', borderColor: '#FFB70F' }}
                                                                    onClick={() => this.setState({ selectedPrevision: item, showBox: true })}
                                                                >
                                                                    Activer
                                                        </Button>
                                                            }
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

                <ConfirmBox
                    show={this.state.showBox}
                    rightButtonOnClick={() => this.updatePrevision(this.state.selectedPrevision.id)}
                    leftButtonOnClick={() => this.setState({ showBox: false, selectedPrevision: null })}
                    message={`Vous voulez-vous ${this.state.selectedPrevision ? this.state.selectedPrevision.status ? 'désactiver' : 'activer' : 'activer' } cette prévision ?`}
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
