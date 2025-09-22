import './style.css';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from "Actions";
import UserService from "Services/users";
import moment from 'moment';
import { getPriceWithCurrency } from 'Helpers/helpers';

class Benefits extends Component<any, any> {

    state = {
        codes: [],
        loading: false
    };

    componentDidMount() {
        this.fetchCodes();
    }

    fetchCodes = async () => {
        this.setState({ loading: true });
        try {
            const response = await UserService.getCodes();
            this.setState({ codes: response || [], loading: false });
        } catch (error) {
            console.error('Error fetching codes:', error);
            this.setState({ loading: false });
        }
    };

    getTypeLabel = (type) => {
        switch(type) {
            case 'DISCOUNT': return 'Code de réduction';
            case 'CODEV': return 'Bon de versement';
            case 'PAYMENT': return 'Bon de caisse';
            default: return type;
        }
    };

    render() {

        const { codes, loading } = this.state;

        return (
            <div>
                <CustomList
                    list={codes}
                    loading={loading}
                    itemsFoundText={n => `${n} code avantages trouvés`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun code trouvé
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Label</th>
                                                <th className="fw-bold">Date de création</th>
                                                <th className="fw-bold">Actif</th>
                                                <th className="fw-bold">Type</th>
                                                <th className="fw-bold">Valeur</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0 text-dark">{item.label}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0 text-dark">{moment(item.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className={`m-0 ${item.active ? 'text-success' : 'text-danger'}`}>{item.active ? 'Oui' : 'Non'}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0 text-dark">{this.getTypeLabel(item.type)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">
                                                                    {item.type !== 'DISCOUNT' ? getPriceWithCurrency(item.amount, item.currency) : `${item.code} (${item.percentage}%)`}
                                                                </h4>
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
            </div>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(Benefits)));