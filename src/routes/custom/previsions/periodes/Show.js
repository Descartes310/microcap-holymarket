import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import AmountCurrency from "Components/AmountCurrency";
import { PREVISIONS, joinUrlWithParams } from "Url/frontendUrl";
import { setRequestGlobalAction, getOnePeriode } from "Actions";

class List extends Component {

    state = {
        payouts: [],
    };

    componentDidMount() {
        this.id = this.props.match.params.id
        this.id2 = this.props.match.params.id2
        this.getPeriode();
    }

    getPeriode() {
        this.props.setRequestGlobalAction(true);
        getOnePeriode(this.id2).then(payouts => {
            this.setState({ payouts });
        }).catch(err => {
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {
        const { history } = this.props;
        const { payouts } = this.state;

        return (
            <>
                <CustomList
                    list={payouts}
                    loading={false}
                    titleList={"Abondement de la période "}
                    itemsFoundText={n => n + " abondement(s) trouvé(s)"}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun abondement trouvé
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Date d'abondement</th>
                                                    <th>Montant</th>
                                                    <th>Montant versé</th>
                                                    <th>Montant restant</th>
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
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.date}</h4>
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
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark"><AmountCurrency amount={0} /></h4>
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
