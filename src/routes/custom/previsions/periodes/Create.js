import PropTypes from "prop-types";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AmountCurrency from "Components/AmountCurrency";
import { NotificationManager } from "react-notifications";
import { PREVISIONS, joinUrlWithParams } from "Url/frontendUrl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { computePercentFromValue, computeValueFromPercent } from "Helpers/helpers";
import { getOnePrevision, setRequestGlobalAction, createPeriode } from "Actions";
import { Button as ButtonStrap, Form, FormGroup, Input as InputStrap } from 'reactstrap';

const affectations = [
    "Acquisition des titres d'une entreprise",
    "Epargne bancaire",
    "Préventes",
    "Sureté de cautionnement",
];

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            amount: 0,
            label: '',
            label: '',
            end: null,
            start: null,
            frequence: null,
            prevision: null,
            amounts: [{ percent: 0, value: 0 }, { percent: 0, value: 0 }, { percent: 0, value: 0 }, { percent: 0, value: 0 }]
        }
    }

    componentDidMount() {
        this.id = this.props.match.params.id;
        this.getPrevision();
    }

    getPrevision() {
        this.props.setRequestGlobalAction(true);
        getOnePrevision(this.id).then(prevision => {
            this.setState({ prevision, start: prevision.periode ? prevision.periode.endDate : prevision.startDate });
        }).catch(err => {
            this.props.history.push(joinUrlWithParams(PREVISIONS.PERIODES.LIST, [{ param: 'id', value: this.id }]));
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {
        if (!this.state.start || !this.state.end || !this.state.frequence) {
            NotificationManager.error('Le formulaire est mal rempli');
            return;
        }

        if (this.state.start >= this.state.end) {
            NotificationManager.error('La date de début est mals renseignée');
            return
        }

        if (this.sum('percent') != 100 || this.sum('value') != this.state.amount) {
            console.log(this.sum('percent'))
            console.log(this.sum('value'))
            NotificationManager.error('Les affectations sont mals renseignées');
            return
        }

        this.props.setRequestGlobalAction(true)

        let data = {
            frequence: this.state.frequence,
            start: this.state.start,
            end: this.state.end,
            amount: this.state.amount,
            amount_acquisition: this.state.amounts[0].value,
            amount_save: this.state.amounts[1].value,
            amount_presale: this.state.amounts[2].value,
            amount_caution: this.state.amounts[3].value
        }

        createPeriode(this.id, data).then(data => {
            this.props.history.push(joinUrlWithParams(PREVISIONS.PERIODES.LIST, [{ param: 'id', value: this.id }]));
        }).finally(() => this.props.setRequestGlobalAction(false))
    };

    updateAmount = (value, index, type) => {
        if (type !== "percent") {
            let amount = { value: Number(value), percent: Number(computePercentFromValue(value, this.state.amount)) };
            let amounts = this.state.amounts;
            amounts[index] = amount;
            this.setState({ amounts: [...amounts] });
        } else {
            let amount = { value: Number(computeValueFromPercent(value, this.state.amount)), percent: Number(value) };
            let amounts = this.state.amounts;
            amounts[index] = amount;
            this.setState({ amounts: [...amounts] });
        }
    }

    updateAmounts = () => {
        for (let index = 0; index < affectations.length; index++) {
            const element = this.state.amounts[index];
            this.updateAmount(element.percent, index, 'percent')
        } 
    }

    sum = (type) => {
        if (type === "percent") {
            return this.state.amounts.reduce((a, b) => a + (b['percent'] || 0), 0)
        } else {
            return this.state.amounts.reduce((a, b) => a + (b['value'] || 0), 0)
        }
    }

    render() {

        const { user } = this.props;
        const { prevision } = this.state;

        return (
            <div className="my-3">
                <div className="my-3 pl-3 page-title m-0">
                    <h2 className="font-lg d-inline-flex">
                        Création d'une prévision
                    </h2>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Prévision
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            disabled
                                            type="text"
                                            id="label"
                                            name={'label'}
                                            value={prevision ? prevision.label : ''}
                                            className="has-input input-lg input-border"
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-6 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="start">
                                            Date de début
                                            </InputLabel>
                                        <InputStrap
                                            required
                                            disabled
                                            id="start"
                                            type="date"
                                            name={'start'}
                                            value={this.state.start}
                                            onChange={(e) => this.setState({ start: e.target.value })}
                                            className="has-input input-lg input-border"
                                        />
                                    </FormGroup>
                                    <FormGroup className="col-sm-6 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="end">
                                            Date de fin
                                            </InputLabel>
                                        <InputStrap
                                            required
                                            id="end"
                                            type="date"
                                            name={'end'}
                                            min={this.state.start}
                                            value={this.state.end}
                                            max={prevision ? prevision.endDate : null}
                                            onChange={(e) => this.setState({ end: e.target.value })}
                                            className="has-input input-lg input-border"
                                        />
                                    </FormGroup>
                                </div>
                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Rythme des abondements
                                        </InputLabel>
                                        <select
                                            className="form-control"
                                            onChange={e => this.setState({ frequence: e.target.value })} >
                                            <option value={null}>
                                                Selectionnez un rythme
                                                </option>
                                            {[
                                                { label: "Jour", value: 'DAY' },
                                                { label: "Semaine", value: 'WEEK' },
                                                { label: "Mois", value: 'MONTH' },
                                                { label: "Trimestre", value: 'TRIMESTER' },
                                            ].map((c, idx) => (
                                                <option key={idx} value={c.value}>
                                                    {c.label}
                                                </option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                </div>
                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Montant d'un abondement sur une période
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="amount"
                                            type="number"
                                            name={'amount'}
                                            value={this.state.amount}
                                            onChange={(e) => this.setState({ amount: e.target.value }, () => {
                                                this.updateAmounts();
                                            })}
                                            className="has-input input-lg input-border"
                                        />
                                    </FormGroup>
                                </div>

                                <h2>Affectation prévisionnelle des abondements de la période</h2>

                                <div className="table-responsive mt-15">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Prévision</th>
                                                <th>Pourcentage (%)</th>
                                                <th>Montant</th>
                                                {/* <th>Pivot</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {affectations.map((value, index) => (
                                                <tr
                                                    className="cursor-pointer"
                                                >
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{value}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">
                                                                    <InputStrap
                                                                        required
                                                                        id="amount"
                                                                        type="number"
                                                                        name={'amount'}
                                                                        value={this.state.amounts[index].percent}
                                                                        className="has-input input-lg input-border"
                                                                        onChange={(e) => this.updateAmount(e.target.value, index, 'percent')}
                                                                    />
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">
                                                                    <InputStrap
                                                                        required
                                                                        id="amount"
                                                                        type="number"
                                                                        name={'amount'}
                                                                        value={this.state.amounts[index].value}
                                                                        onChange={(e) => this.updateAmount(e.target.value, index, 'value')}
                                                                        className="has-input input-lg input-border"
                                                                    />
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr
                                                className="cursor-pointer"
                                            >
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">Total</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{this.sum('percent')}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark"><AmountCurrency amount={this.sum('value')} /></h4>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="row" style={{ marginTop: 40 }}>
                                    <ButtonStrap
                                        color="primary"
                                        className="fw-bold btn-submit text-white"
                                        onClick={() => this.onSubmit()}
                                    >
                                        Créer la période
                                    </ButtonStrap>
                                </div>

                            </Form>
                        </RctCollapsibleCard>
                    </div>
                </div>
            </div>
        );
    }
}

Create.propTypes = {
    type: PropTypes.string.isRequired,
};

const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return {
        user: authUser.data,
        requestGlobalLoader,
        communitySpace: communitySpace.data
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter((injectIntl(Create))));
