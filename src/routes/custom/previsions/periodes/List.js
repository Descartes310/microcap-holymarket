import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { datediff } from 'Helpers/helpers';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import AmountCurrency from "Components/AmountCurrency";
import { PREVISIONS, joinUrlWithParams } from "Url/frontendUrl";
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

    getRythme = (rythme) => {
        switch (rythme) {
            case 'DAY':
                return 'Jour'; 
            case 'WEEK':
                return 'Semaine'; 
            case 'MONTH':
                return 'Mois'; 
            case 'TRIMESTER':
                return 'Trimestre';        
            default:
                return 'Jour';
        }
    }

    getRythmeValue = (rythme) => {
        switch (rythme) {
            case 'DAY':
                return 1; 
            case 'WEEK':
                return 7; 
            case 'MONTH':
                return 30; 
            case 'TRIMESTER':
                return 90;        
            default:
                return 1;
        }
    }

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
                    onAddClick={() => history.push(joinUrlWithParams(PREVISIONS.PERIODES.CREATE, [{param: 'id', value: this.id}]))}
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
                                                    <th>Date de début</th>
                                                    <th>Date de fin</th>
                                                    <th>Montant</th>
                                                    <th>Rythme</th>
                                                    <th>Abondements</th>
                                                    <th>Montant Total</th>
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
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark"><AmountCurrency amount={item.amount} /></h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{this.getRythme(item.frequence)}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{ datediff(item.startDate, item.endDate, this.getRythmeValue(item.frequence)) }</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark"><AmountCurrency amount={item.amount * datediff(item.startDate, item.endDate, this.getRythmeValue(item.frequence))} /></h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="table-action">
                                                            <Button
                                                                size="small"
                                                                variant="contained"
                                                                className={"text-white bg-blue"}
                                                            >
                                                                Versements
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
