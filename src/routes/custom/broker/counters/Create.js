import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import IntlMessages from "Util/IntlMessages";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { BROKER, joinUrlWithParamsId } from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { createAgencyCounter, setRequestGlobalAction } from "Actions";
import { Button, Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            email: '',
            label: '',
            password: '',
            telephone: '',
        }
    }

    componentDidMount() {
    }

    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    validate = () => {
        if (this.state.label.trim().length <= 0) {
            NotificationManager.error(this.props.intl.formatMessage({ id: 'form.error.verify.name' }));
            return false;
        }
        if (this.state.city.trim().length <= 0) {
            NotificationManager.error("La ville du guichet est obligatoire");
            return false;
        }
        if (this.state.email.trim().length <= 0 || this.state.telephone.trim().length <= 0 || this.state.password.trim().length <= 0) {
            NotificationManager.error("Les informations du responsable sont obligatoires");
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            let data = {
                city: this.state.city,
                label: this.state.label,
                email: this.state.email,
                password: this.state.password,
                telephone: this.state.telephone,
            };

            createAgencyCounter(data)
                .then((response) => {
                    NotificationManager.success("Nouveau guichet créé avec succès");
                })
                .finally(() => {
                    this.props.setRequestGlobalAction(false);
                    this.props.history.push(BROKER.COUNTERS.LIST);
                });
        }
    };

    render() {
        const { match, history } = this.props;

        return (
            <>
                <PageTitleBar
                    match={match}
                    history={history}
                    title={"Création d'un nouveau guichet"}
                />
                <div className="full-height row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>

                                <h2 className="font-weight-bold mb-30">Informations sur le guichet</h2>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Nom du guichet
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="label"
                                            name={'label'}
                                            value={this.state.label}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('label', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="city">
                                            Ville d'implantation
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="city"
                                            name={'city'}
                                            value={this.state.city}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('city', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <h2 className="font-weight-bold mb-30">Informations sur le responsable</h2>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="email">
                                            Adresse email
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="email"
                                            name={'email'}
                                            value={this.state.email}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('email', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="telephone">
                                            Numéro de téléphone
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="telephone"
                                            name={'telephone'}
                                            value={this.state.telephone}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('telephone', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="password">
                                            Mot de passe
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="password"
                                            name={'password'}
                                            value={this.state.password}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('password', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <Button
                                        color="primary"
                                        className="fw-bold btn-submit text-white"
                                        onClick={() => this.onSubmit()}
                                    >
                                        <i className="fw-bold ti-check mr-2" />
                                        <IntlMessages id="button.submit" />
                                    </Button>
                                </div>

                            </Form>
                        </RctCollapsibleCard>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter((injectIntl(Create))));
