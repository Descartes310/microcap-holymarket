import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { PREVISIONS } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction, getPrevisionPeriodes } from "Actions";

class List extends Component {

    state = {
        periodes: []
    };

    componentDidMount() {
        this.id = this.props.match.params.id
        this.getPeriodes();
    }

    getPeriodes = () => {
        this.props.setRequestGlobalAction(true);
        getPrevisionPeriodes(this.id).then(periodes => {
            this.setState({ periodes })
        }).catch(err => {
            this.props.history.push(PREVISIONS.PREVISIONS.LIST);
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    };

    render() {
        const { history } = this.props;
        const { periodes, show } = this.state;

        return (
            <>
                <CustomList
                    list={periodes}
                    loading={false}
                    titleList={"Liste des périodes"}
                    itemsFoundText={n => n + " périodes(s) trouvée(s)"}
                    onAddClick={() => history.push(PREVISIONS.CREATE)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun période trouvée
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
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.label}</h4>
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
                                                                // onClick={() => this.setState({ show: true, goal: item })}
                                                            >
                                                                Périodes
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
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(List)));
