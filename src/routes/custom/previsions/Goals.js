import Doc from 'Helpers/DocService';
import { connect } from "react-redux";
import styled from 'styled-components';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import GoalSelection from "./GoalSelection";
import { MICROCAP360 } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Button as ButtonStrap } from 'reactstrap';
import { NotificationManager } from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { setRequestGlobalAction, getActivePass, getPrevisionDetails, getPrevisionGoals, updateGoals } from "Actions";

const P = styled.p`
font-size: 16px !important;
`;

const Span = styled.span`
font-weight: bold;
display: inline-block;
width: 20% !important;
`;

class Goals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            goals: [],
            end: null,
            goal: null,
            pass: null,
            start: null,
            show: false,
            print: false,
            prevision: null,
            selectedGoals: [],
        }
        this.bodyRef = React.createRef();
    }

    componentDidMount() {
        this.getPass();
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

    getPass = () => {
        this.props.setRequestGlobalAction(true);
        getActivePass().then(pass => {
            this.getDetails();
            this.setState({ pass });
        }).finally(() => this.props.setRequestGlobalAction(false))
    }

    getDetails = () => {
        getPrevisionDetails().then(prevision => {
            this.setState({ prevision, selectedGoals: prevision.goals })
        }).catch(err => {
            NotificationManager.error("Aucune prévision active")
            this.props.history.push(MICROCAP360.MY.PROJECT);
        })
    }

    selectDate = (date) => {
        this.setState({ selectedGoals: [...this.state.selectedGoals, { goal: this.state.goal, deadline: date }], show: false, goal: null });
    }

    onSubmit = () => {
        if (this.state.selectedGoals.length <= 0) {
            return;
        }

        this.props.setRequestGlobalAction(true)

        let data = {
            goals: JSON.stringify(this.state.selectedGoals.map(sg => { return { id: sg.goal.id, date: sg.deadline } }))
        }

        updateGoals(data).then(data => {
            this.props.history.push(MICROCAP360.MY.PROJECT);
        }).finally(() => this.props.setRequestGlobalAction(false))
    };

    render() {

        const { goals, selectedGoals } = this.state;

        return (
            <div className="my-3">
                <div className="my-3 pl-3 page-title m-0">
                    <h2 className="font-lg d-inline-flex">
                        Mes objectifs
                    </h2>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
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
                                                                    <h4 className="m-0 fw-bold text-dark">{item.deadline}</h4>
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
                                    onClick={() => this.onSubmit()}
                                >
                                    Enregistrer
                                </ButtonStrap>
                            </div>
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

const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        user: authUser.data,
        requestGlobalLoader
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter((injectIntl(Goals))));
