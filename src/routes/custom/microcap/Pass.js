import Doc from 'Helpers/DocService';
import { connect } from "react-redux";
import styled from 'styled-components';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { formatDate } from '../../../helpers/helpers';
import AmountCurrency from "Components/AmountCurrency";
import { NotificationManager } from 'react-notifications';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { Button as ButtonStrap, Form, FormGroup, Input as InputStrap } from 'reactstrap';
import { setRequestGlobalAction, generateCode, activePass, getActivePass, getPrevisionDetails } from "Actions";

const P = styled.p`
font-size: 16px !important;
`;

const Span = styled.span`
font-weight: bold;
display: inline-block;
width: 20% !important;
`;

class Pass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            end: null,
            start: null,
            pass: null,
            prevision: null,
            print: false
        }
        this.bodyRef = React.createRef();
    }

    componentDidMount() {
        this.getPass();
    }


    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    createPdfTest = () => {
        this.setState({ print: true }, () => {
            Doc.printPdf(this.bodyRef.current, () => { this.setState({ print: false }) });
        })
    };

    onSubmit = () => {
        this.props.setRequestGlobalAction(true);
        activePass(this.state.start, this.state.end).then(data => {
            NotificationManager.success('Pass activé avec succès');
            window.location.reload();
        }).catch(err => {
            NotificationManager.error('Votre plan sur la plateforme Microcap n\'est pas complètement renseigné: pas de prévision active');
        }).finally(() => this.props.setRequestGlobalAction(false))
    };

    generatePassCode = () => {
        this.props.setRequestGlobalAction(true);
        generateCode().then(data => {
            NotificationManager.success('Code généré avec succès');
            window.location.reload();
        }).catch(err => {
            NotificationManager.error('Votre plan sur la plateforme Microcap n\'est pas complètement renseigné: pas de prévision active');
        }).finally(() => this.props.setRequestGlobalAction(false))
    }

    getPass = () => {
        this.props.setRequestGlobalAction(true);
        getActivePass().then(pass => {
            this.getDetails();
            this.setState({ pass });
        }).finally(() => this.props.setRequestGlobalAction(false))
    }

    getDetails = () => {
        getPrevisionDetails().then(prevision => {
            this.setState({ prevision })
        })
    }

    render() {

        const { user } = this.props;
        const { end, start, pass, prevision } = this.state;

        return (
            <>
                {!user.user.passCode || !pass ?
                    <div className="container">
                        <div className="my-3 page-title m-0">
                            <h2 className="font-lg d-inline-flex">
                                Mon Pass Microcap
                            </h2>
                        </div>
                        <div className="row mt-40">
                            <div className="col-md-12 col-sm-12 pr-md-40">
                                <Form onSubmit={this.onSubmit}>
                                    <div>
                                        <div className="row">
                                            <FormGroup className="col-sm-12 has-wrapper">
                                                <InputLabel className="text-left" htmlFor="label">
                                                    Date d'activation souhaitée
                                            </InputLabel>
                                                <InputStrap
                                                    required
                                                    id="start"
                                                    type="date"
                                                    value={start}
                                                    name={'start'}
                                                    className="has-input input-lg input-border"
                                                    onChange={(e) => { 
                                                        this.handleOnFormChange('start', e.target.value);
                                                        let end = new Date(e.target.value);
                                                        end.setMonth(end.getMonth() + 36);
                                                        this.setState({ end: formatDate(end) });
                                                    }}
                                                />
                                            </FormGroup>

                                            <FormGroup className="col-sm-12 has-wrapper">
                                                <InputLabel className="text-left" htmlFor="label">
                                                    Date de fin de validité
                                            </InputLabel>
                                                <InputStrap
                                                    required
                                                    disabled
                                                    id="end"
                                                    type="date"
                                                    value={end}
                                                    name={'end'}
                                                    disabled={!start}
                                                    min={start ? start : null}
                                                    className="has-input input-lg input-border"
                                                    //onChange={(e) => this.handleOnFormChange('end', e.target.value)}
                                                />
                                            </FormGroup>

                                            <FormGroup className="col-sm-12 has-wrapper">
                                                <InputLabel className="text-left" htmlFor="label">
                                                    Code d'activation
                                        </InputLabel>
                                                <InputStrap
                                                    required
                                                    id="code"
                                                    type="text"
                                                    name={'code'}
                                                    disabled={!end}
                                                    value={user.user.passCode}
                                                    placeholder='XXXX-XXXX-XXXX'
                                                    className="has-input input-lg input-border"
                                                />
                                            </FormGroup>

                                        </div>

                                        <div className="row">
                                            {!user.user.passCode ?
                                                <ButtonStrap
                                                    color="primary"
                                                    onClick={() => this.generatePassCode()}
                                                    className="fw-bold btn-submit text-white"
                                                >
                                                    Générer le code d'activation
                                        </ButtonStrap>
                                                :
                                                <ButtonStrap
                                                    color="primary"
                                                    disabled={!start || !end}
                                                    onClick={() => this.onSubmit()}
                                                    className="fw-bold btn-submit text-white"
                                                >
                                                    Activer mon Pass
                                        </ButtonStrap>
                                            }
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="container custom-container" ref={this.bodyRef}>
                        <div className="my-3 page-title m-0 d-flex">
                            <h2 className="font-lg d-inline-flex font-weight-bold">
                                Fiche d'information client
                            </h2>
                            <Button
                                size="small"
                                variant="contained"
                                style={{ display: this.state.print ? 'none' : 'block' }}
                                onClick={() => this.createPdfTest()}
                                className={"text-white bg-primary ml-30"}
                            >
                                Imprimer la fiche client
                            </Button>
                        </div>
                        <div className="row m-0 mt-40">
                            <div className="col-md-12 col-sm-12 pr-md-40">
                                <h2 className="font-lg d-inline-flex" style={{ fontSize: '1.8em' }}>
                                    Identification du membre
                                </h2>
                                <div className="mt-20">
                                    <P><Span>Identifiant plateforme: </Span>{user.user.reference}</P>
                                    <P><Span>Noms: </Span>{user.firstName}</P>
                                    <P><Span>Prénoms: </Span>{user.lastName}</P>
                                    <P><Span>Date de naissance: </Span>{user.dateBirth}</P>
                                </div>
                            </div>
                            {
                                prevision && (

                                    <div className="col-md-12 col-sm-12 pr-md-40 mt-15">
                                        <h2 className="font-lg d-inline-flex" style={{ fontSize: '1.8em' }}>
                                            Objectifs
                                        </h2>

                                        <div className="mt-20">
                                            {
                                                prevision.goals.length <= 0 ?
                                                    <Span>Aucun Objectif trouvé</Span>
                                                    :
                                                    prevision.goals.map((goal, index) => (
                                                        <P><Span>Objectif {index+1}: </Span><span className="font-weight-bold" >{goal.goal.label}</span> avec pour date d'écheance le <span className="font-weight-bold" >{goal.deadline}</span></P>
                                                    ))
                                            }
                                        </div>

                                    </div>
                                )
                            }
                    
                            { prevision && (
                                <div className="col-md-12 col-sm-12 pr-md-40 mt-15">
                                    <h2 className="font-lg d-inline-flex" style={{ fontSize: '1.8em' }}>
                                        Plan prévisionnel
                                    </h2>

                                    <div className="mt-20">
                                        <P><Span>Date d'abondement</Span><Span>Abondement</Span><Span>Versement</Span></P>
                                        { prevision.periodes.sort((a, b) => a.date.localeCompare(b.date)).map((payout, index) => (
                                            <P><Span>{payout.date}</Span><Span><AmountCurrency amount={payout.amount} /></Span><Span><AmountCurrency amount={0} /></Span></P>
                                        ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        user: authUser.data,
        requestGlobalLoader
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter((injectIntl(Pass))));
