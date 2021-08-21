import PropTypes from "prop-types";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import GoalSelection from "./GoalSelection";
import { PREVISIONS } from "Url/frontendUrl";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { formatDate } from "../../../helpers/helpers";
import { NotificationManager } from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { getPrevisionGoals, setRequestGlobalAction, createPrevision } from "Actions";
import { Button as ButtonStrap, Form, FormGroup, Input as InputStrap } from 'reactstrap';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            type: '',
            label: '',
            goals: [],
            goal: null,
            show: false,
            label: '',
            start: null,
            description: '',
            selectedGoals: [],
        }
    }

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

    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    onSubmit = () => {
        if (!this.state.start || this.state.selectedGoals.length <= 0 || this.state.label.length <= 1) {

        }

        this.props.setRequestGlobalAction(true)

        let data = {
            start: this.state.start,
            label: this.state.label,
            goals: JSON.stringify(this.state.selectedGoals.map(sg => { return { id: sg.goal.id, date: sg.date } }))
        }
        console.log(data);
        createPrevision(data).then(data => {
            this.props.history.push(PREVISIONS.LIST);
        }).finally(() => this.props.setRequestGlobalAction(false))
    };

    selectDate = (date) => {
        this.setState({ selectedGoals: [...this.state.selectedGoals, { goal: this.state.goal, date }], show: false, goal: null });
    }

    computeEndDate = () => {
        if (this.state.start) {
            let start = new Date(this.state.start);
            let end = start;
            end.setDate(end.getDate() + 30 * 36);
            // let end = new Date(start.setMonth(start.getMonth()+36));
            return formatDate(end);
        } else {
            return null;
        }
    }

    render() {

        const { user } = this.props;
        const { stage, goals, selectedGoals } = this.state;

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
                                <div style={{ display: !stage ? 'block' : 'none' }}>
                                    <div className="row">
                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="label">
                                                Identifiant plateforme
                                        </InputLabel>
                                            <InputStrap
                                                required
                                                disabled
                                                id="label"
                                                name={'label'}
                                                value={user.user.reference}
                                                className="has-input input-lg input-border"
                                            />
                                        </FormGroup>

                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="label">
                                                Noms
                                        </InputLabel>
                                            <InputStrap
                                                required
                                                disabled
                                                type="text"
                                                id="name"
                                                name={'name'}
                                                value={user.userName}
                                                className="has-input input-lg input-border"
                                            />
                                        </FormGroup>

                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="label">
                                                Prénoms
                                        </InputLabel>
                                            <InputStrap
                                                required
                                                disabled
                                                type="text"
                                                id="lastname"
                                                name={'lastname'}
                                                value={user.userName}
                                                className="has-input input-lg input-border"
                                            />
                                        </FormGroup>

                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="label">
                                                Date de naissance
                                        </InputLabel>
                                            <InputStrap
                                                required
                                                disabled
                                                type="text"
                                                id="birthdate"
                                                name={'birthdate'}
                                                value={user.dateBirth}
                                                className="has-input input-lg input-border"
                                            />
                                        </FormGroup>
                                    </div>

                                    <div className="row">
                                        <ButtonStrap
                                            color="primary"
                                            className="fw-bold btn-submit text-white"
                                            onClick={() => this.props.history.push(PREVISIONS.LIST)}
                                        >
                                            Annuler
                                    </ButtonStrap>
                                        <ButtonStrap
                                            color="primary"
                                            className="fw-bold btn-submit text-white"
                                            onClick={() => this.setState({ stage: 1 })}
                                        >
                                            Continuer
                                    </ButtonStrap>
                                    </div>
                                </div>

                                <div style={{ display: stage ? 'block' : 'none' }}>
                                    <div className="row">
                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="label">
                                                Label
                                            </InputLabel>
                                            <InputStrap
                                                required
                                                type="text"
                                                id="label"
                                                name={'label'}
                                                value={this.state.label}
                                                onChange={(e) => this.setState({ label: e.target.value })}
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
                                                disabled
                                                id="end"
                                                type="date"
                                                name={'end'}
                                                value={this.computeEndDate()}
                                                className="has-input input-lg input-border"
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Titre</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {goals && goals.filter(g => !selectedGoals.map(sg => sg.goal.id).includes(g.id)).map((item, key) => (
                                                            <tr
                                                                key={key}
                                                                className="cursor-pointer"
                                                            >
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="table-action">
                                                                    <Button
                                                                        size="small"
                                                                        variant="contained"
                                                                        className={"text-white bg-blue"}
                                                                        onClick={() => this.setState({ show: true, goal: item })}
                                                                    >
                                                                        Sélectionner
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Titre</th>
                                                            <th>Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedGoals && selectedGoals.map((item, key) => (
                                                            <tr
                                                                key={key}
                                                                className="cursor-pointer"
                                                            >
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.goal.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.date}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="table-action">
                                                                    <Button
                                                                        size="small"
                                                                        variant="contained"
                                                                        className={"text-white bg-blue"}
                                                                        onClick={() => this.setState({ selectedGoals: selectedGoals.filter(sg => sg.goal.id !== item.goal.id) })}
                                                                    >
                                                                        Rétirer
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: 40 }}>
                                        <ButtonStrap
                                            color="primary"
                                            className="fw-bold btn-submit text-white"
                                            onClick={() => this.setState({ stage: 0 })}
                                        >
                                            Précédent
                                        </ButtonStrap>
                                        <ButtonStrap
                                            color="primary"
                                            className="fw-bold btn-submit text-white"
                                            onClick={() => this.onSubmit()}
                                        >
                                            Créer la prévision
                                        </ButtonStrap>
                                    </div>
                                </div>

                            </Form>
                        </RctCollapsibleCard>
                    </div>
                </div>
                {this.state.goal && (
                    <GoalSelection
                        goal={this.state.goal}
                        show={this.state.show}
                        selectDate={this.selectDate}
                        close={() => this.setState({ show: false, goal: null })}
                    />
                )}
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
